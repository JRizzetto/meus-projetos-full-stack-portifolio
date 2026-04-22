const summaryCards = [
  {
    title: "Total Tasks",
    value: 24,
  },
  {
    title: "Completed",
    value: 16,
  },
  {
    title: "Pending",
    value: 6,
  },
  {
    title: "In Progress",
    value: 2,
  },
];

const recentTasks = [
  {
    id: 1,
    title: "Finish landing page",
    status: "Completed",
    priority: "High",
  },
  {
    id: 2,
    title: "Create login screen",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Plan database models",
    status: "Pending",
    priority: "High",
  },
  {
    id: 4,
    title: "Write project documentation",
    status: "Completed",
    priority: "Low",
  },
];

export default function DashboardPage() {
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
