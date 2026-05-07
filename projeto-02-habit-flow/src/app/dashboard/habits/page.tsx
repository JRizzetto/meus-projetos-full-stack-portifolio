import CreateHabitForm from "@/components/CreateHabitForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CompleteHabitButton from "@/components/CompleteHabitButton";

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
        where: {
          date: today,
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
          const isCompletedToday = habit.completions.length > 0;

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
            </div>
          );
        })}
      </div>
    </main>
  );
}
