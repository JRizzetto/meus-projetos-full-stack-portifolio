"use client";

import { useState } from "react";
import { DeleteTaskButton } from "@/components/delete-task-button";
import { UpdateTaskStatusButton } from "@/components/update-task-status-button";
import { EditTaskForm } from "@/components/edit-task-form";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | null;
};

type Props = {
  tasks: Task[];
};

export function TasksList({ tasks }: Props) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description ?? "").toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <>
      <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-600"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-600"
        >
          <option value="ALL">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-600"
        />
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
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

        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
            No tasks found.
          </div>
        ) : null}
      </div>
    </>
  );
}
