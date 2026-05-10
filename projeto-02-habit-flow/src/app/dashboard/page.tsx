import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardStats from "@/components/DashboardStats";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const habits = await prisma.habit.findMany({
    where: {
      userId: user.id,
    },
    include: {
      completions: {
        where: {
          date: today,
        },
      },
    },
  });

  const totalHabits = habits.length;

  const completedToday = habits.filter(
    (habit) => habit.completions.length > 0,
  ).length;

  const completionPercentage =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <main className="px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-indigo-600">HabitFlow</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Welcome back, {session.user?.name}
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your habits, track your consistency, and follow your progress.
        </p>

        <DashboardStats
          totalHabits={totalHabits}
          completedToday={completedToday}
          completionPercentage={completionPercentage}
        />

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Habit Tracker
          </h2>
          <p className="mt-2 text-slate-600">
            Create habits, complete them daily, and analyze your progress.
          </p>

          <Link
            href={"/dashboard/habits"}
            className="mt-5 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Go to habits
          </Link>
        </div>
      </div>
    </main>
  );
}
