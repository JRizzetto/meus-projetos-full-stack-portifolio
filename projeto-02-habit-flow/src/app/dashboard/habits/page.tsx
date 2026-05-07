import CreateHabitForm from "@/components/CreateHabitForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CompleteHabitButton from "@/components/CompleteHabitButton";
import { calculateStreak } from "@/lib/calculateStreak";
import { calculateBestStreak } from "@/lib/calculateBestStreak";

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
    <main className="p-8">
      <h1 className="text-2xl font-bold">Habis</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total habits</p>
          <strong className="text-2xl">{totalHabits}</strong>
        </div>

        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Completed today</p>
          <strong className="text-2xl">{completedToday}</strong>
        </div>

        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Completion</p>
          <strong className="text-2xl">{completionPercentage}%</strong>
        </div>
      </div>

      <CreateHabitForm />

      <div className="mt-8 flex flex-col gap-4">
        {habits.map((habit) => {
          const isCompletedToday = habit.completions.some((completion) => {
            const completionDate = new Date(completion.date);
            completionDate.setHours(0, 0, 0, 0);

            return completionDate.getTime() === today.getTime();
          });

          const currentStreak = calculateStreak(habit.completions);
          const bestStreak = calculateBestStreak(habit.completions);

          return (
            <div key={habit.id} className="rounded-lg border p-4 shadow-sm">
              <h2 className="font-semibold">{habit.title}</h2>

              {habit.description && (
                <p className="text-sm text-gray-600">{habit.description}</p>
              )}

              <div className="mt-4">
                <CompleteHabitButton
                  habitId={habit.id}
                  isCompletedToday={isCompletedToday}
                />
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Current Streak: {currentStreak} days
              </p>

              <p className="text-sm text-gray-500">
                Best streak: {bestStreak} days
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
