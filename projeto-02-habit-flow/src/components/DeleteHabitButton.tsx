"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type DeleteHabitButtonProps = {
  habitId: string;
};

export default function DeleteHabitButton({ habitId }: DeleteHabitButtonProps) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  async function handleDeleteHabit() {
    setDeleting(true);

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
      toast.success("Habit deleted successfully!");
      router.refresh();
    } else {
      toast.error("Failed to delete habit");
    }

    setDeleting(false);
  }

  return (
    <button
      onClick={handleDeleteHabit}
      className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 cursor-pointer"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
