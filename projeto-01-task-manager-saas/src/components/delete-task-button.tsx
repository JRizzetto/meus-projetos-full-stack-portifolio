"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  taskId: string;
};

export function DeleteTaskButton({ taskId }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delte task");
        return;
      }

      // Atualiza a lista
      router.refresh();
    } catch {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 cursor-pointer"
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
