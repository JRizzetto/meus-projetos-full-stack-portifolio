"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: Date | null;
  };
};

export function EditTaskForm({ task }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.toISOString().split("T")[0] : "",
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    try {
      setIsLoading(true);

      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/sjon",
        },
        body: JSON.stringify({
          title,
          description,
          status,
          priority,
          dueDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Unable to update task.");
        return;
      }

      setIsOpen(false);
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer transition hover:bg-gray-100"
      >
        Edit
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 ">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Edit task</h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
              />
              <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
              />

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>

              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
              >
                <option value="LOW">low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
              />

              {errorMessage ? (
                <p className="text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Saving..." : "Save changes"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
