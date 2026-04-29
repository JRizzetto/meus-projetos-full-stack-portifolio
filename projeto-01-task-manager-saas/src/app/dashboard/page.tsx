import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
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

  const [totalTasks, completedTasks, pendingTasks, inProgressTasks, title] =
    await Promise.all([
      prisma.task.count({
        where: { userId: user.id },
      }),
      prisma.task.count({
        where: { userId: user.id, status: "COMPLETED" },
      }),
      prisma.task.count({
        where: { userId: user.id, status: "PENDING" },
      }),
      prisma.task.count({
        where: { userId: user.id, status: "IN_PROGRESS" },
      }),
      prisma.task.count({
        where: { userId: user.id },
      }),
    ]);

  const summaryCards = [
    {
      title: "Total tasks",
      value: totalTasks,
    },
    {
      title: "Completed",
      value: completedTasks,
    },
    {
      title: "Pending",
      value: pendingTasks,
    },
    {
      title: "In Progress",
      value: inProgressTasks,
    },
  ];

  const recentTasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Here is an overview of your tasks and recent activity.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
          <p className="mt-1 text-sm text-gray-600">
            A quick look at your latest tasks.
          </p>
        </div>

        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Status: {task.status}
                </p>
              </div>

              <span className="w-fit rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
