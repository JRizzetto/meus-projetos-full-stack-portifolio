const tasks = [
  {
    id: 1,
    title: "Finish project documentation",
    description:
      "Write the first version of the project specification and flow.",
    status: "Pending",
    priority: "High",
    dueDate: "2026-04-25",
  },
  {
    id: 2,
    title: "Build login page",
    description: "Create the login screen and keep the UI consistent.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-04-26",
  },
  {
    id: 3,
    title: "Create dashboard cards",
    description:
      "Add summary cards with mock data for the first dashboard version.",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-04-20",
  },
  {
    id: 4,
    title: "Plan Prisma models",
    description: "Define User and Task entities for the database.",
    status: "Pending",
    priority: "High",
    dueDate: "2026-04-28",
  },
];

export default function TaskPage() {
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
                <p className="mt-2 text-gray-600">{task.description}</p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    {task.status}
                  </span>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                    {task.priority}
                  </span>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    Due: {task.dueDate}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                  Edit
                </button>
                <button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                  Delete
                </button>
                <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                  Complete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
