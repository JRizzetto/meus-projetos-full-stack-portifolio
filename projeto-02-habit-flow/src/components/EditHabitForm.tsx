"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type EditHabitFormProps = {
  habitId: string;
  initialTitle: string;
  initialDescription?: string | null;
  initialColor: string | null;
};

export default function EditHabitForm({
  habitId,
  initialTitle,
  initialDescription,
  initialColor,
}: EditHabitFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [color, setColor] = useState(initialColor ?? "");

  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdateHabit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(`/api/habits/${habitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        color,
      }),
    });

    if (response.ok) {
      router.refresh();
    }
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 cursor-pointer"
      >
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={handleUpdateHabit} className="mt-4 flex flex-col gap-2">
      <input
        className="rounded border p-2 text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="rounded border p-2 text-sm"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <select
        className="rounded border p-2 text-sm"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="">Select a color</option>
        <option value="indigo">Indigo</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>

      <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
        Save changes
      </button>

      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Cancel
      </button>
    </form>
  );
}
