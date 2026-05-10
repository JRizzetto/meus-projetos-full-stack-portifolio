"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateHabitForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const router = useRouter();

  async function handleCreateHabit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          color,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTitle("");
        setDescription("");
        setColor("");

        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleCreateHabit}
      className="mt-5 grid gap-4 md:grid-cols-3"
    >
      <input
        type="text"
        placeholder="Habit title"
        className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 md:col-span-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <select
        className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="">Select a color</option>
        <option value="indigo">Indigo</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 cursor-pointer"
      >
        Create Habit
      </button>
    </form>
  );
}
