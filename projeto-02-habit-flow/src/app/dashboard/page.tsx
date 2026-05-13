import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardStats from "@/components/DashboardStats";
import CompletionRadialChart from "@/components/CompletionRadialChart";

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
    <main className="px-4 py-6 sm:px-6 sm:py-8">
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
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-9900">
                Today's progress
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {completedToday} of {totalHabits} habists completed today
              </p>
            </div>

            <strong className="text-3xl font-bold text-indigo-600">
              {completionPercentage}%
            </strong>
          </div>

          <div className="mt-5 h-3 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-indigo-600 transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="mt-8">
          <CompletionRadialChart completionPercentage={completionPercentage} />
        </div>

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent habits
            </h2>

            <Link
              href="/dashboard/habits"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {habits.slice(0, 3).map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{habit.title}</p>
                  <p className="text-sm text-slate-500">
                    {habit.completions.length > 0
                      ? "Completed today"
                      : "Pending today"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${habit.completions.length > 0 ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}
                >
                  {habit.completions.length > 0 ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
