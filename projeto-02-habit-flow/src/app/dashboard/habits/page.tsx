import CreateHabitForm from "@/components/CreateHabitForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function HabitsPage() {
  const session = await getServerSession(authOptions);

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
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Habis</h1>

      <CreateHabitForm />

      <div className="mt-8 flex flex-col gap-4">
        {habits.map((habit) => (
          <div key={habit.id} className="rounded-lg border p-4 shadow-sm">
            <h2 className="font-semibold">{habit.title}</h2>

            {habit.description && (
              <p className="text-sm text-gray-600">{habit.description}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
