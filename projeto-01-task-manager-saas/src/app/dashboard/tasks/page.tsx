import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateTaskForm } from "@/components/create-task-form";
import { TasksList } from "@/components/tasks-list";

export default async function TaskPage() {
  const session = await auth();

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

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md: flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My tasks</h1>
          <p className="mt-2 text-gray-600">
            Manage your tasks, priorities, and deadlines in one place.
          </p>
        </div>

        <button className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700">
          + New Task
        </button>
      </div>

      <CreateTaskForm />

      <TasksList tasks={tasks} />
    </section>
  );
}
