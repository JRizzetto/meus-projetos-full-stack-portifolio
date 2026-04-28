import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateTaskForm } from "@/components/create-task-form";
import { DeleteTaskButton } from "@/components/delete-task-button";
import { UpdateTaskStatusButton } from "@/components/update-task-status-button";
import { EditTaskForm } from "@/components/edit-task-form";

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

      <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <select className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-600">
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-600">
          <option>All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="text"
          placeholder="Search tasks..."
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-600"
        />
      </div>

      <div className="space-y-4">
        <CreateTaskForm />

        {tasks.map((task) => (
          <article
            key={task.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-900">
                  {task.title}
                </h2>
                <p className="mt-2 text-gray-600">
                  {task.description ?? "No description"}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    {task.status}
                  </span>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                    {task.priority}
                  </span>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    Due:{" "}
                    {task.dueDate
                      ? task.dueDate.toISOString().split("T")[0]
                      : "No due date"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <EditTaskForm task={task} />
                <DeleteTaskButton taskId={task.id} />

                <UpdateTaskStatusButton
                  taskId={task.id}
                  currentStatus={task.status}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
