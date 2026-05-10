import CreateHabitForm from "@/components/CreateHabitForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calculateStreak } from "@/lib/calculateStreak";
import { calculateBestStreak } from "@/lib/calculateBestStreak";
import HabitCard from "@/components/HabitCard";
import DashboardStats from "@/components/DashboardStats";

export default async function HabitsPage() {
  const session = await getServerSession(authOptions);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const habits = await prisma.habit.findMany({
    where: {
      userId: user.id,
    },
    include: {
      completions: {
        orderBy: {
          date: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">HabitFlow</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Your habits
          </h1>
          <p className="mt-2 text-slate-600">
            Track your daily progress, build consistency, and improve your
            routine.
          </p>
        </div>

        <DashboardStats
          totalHabits={totalHabits}
          completedToday={completedToday}
          completionPercentage={completionPercentage}
        />

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Create a new habit
          </h2>

          <CreateHabitForm />
        </section>

        {habits.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No habits yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Create your first habit to start tracking your progress.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {habits.map((habit) => {
              const isCompletedToday = habit.completions.some((completion) => {
                const completionDate = new Date(completion.date);
                completionDate.setHours(0, 0, 0, 0);

                return completionDate.getTime() === today.getTime();
              });

              const currentStreak = calculateStreak(habit.completions);
              const bestStreak = calculateBestStreak(habit.completions);

              return (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isCompletedToday={isCompletedToday}
                  currentStreak={currentStreak}
                  bestStreak={bestStreak}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
