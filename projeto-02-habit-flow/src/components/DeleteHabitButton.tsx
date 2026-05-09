"use client";

import { useRouter } from "next/navigation";

type DeleteHabitButtonProps = {
  habitId: string;
};

export default function DeleteHabitButton({ habitId }: DeleteHabitButtonProps) {
  const router = useRouter();

  async function handleDeleteHabit() {
    const confirmDelete = confirm(
      "Are you sure you want to delete this habit?",
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(`/api/habits/${habitId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDeleteHabit}
      className="rounded bg-red-600 px-3 py-2 text-sm text-white ml-2 cursor-pointer"
    >
      Delete
    </button>
  );
}
