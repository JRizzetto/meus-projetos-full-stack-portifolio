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
      className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 cursor-pointer"
    >
      Delete
    </button>
  );
}
