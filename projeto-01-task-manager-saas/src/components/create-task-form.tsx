"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateTaskForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    try {
      setIsLoading(true);

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          dueDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Unable to create task.");
        return;
      }

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");

      router.refresh();
    } catch {
      setErrorMessage("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900">Create new task</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
        />

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-600"
        />
      </div>

      {errorMessage ? (
        <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
      >
        {isLoading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
