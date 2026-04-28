"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  taskId: string;
  currentStatus: String;
};

export function UpdateTaskStatusButton({ taskId, currentStatus }: Props) {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const isCompleted = currentStatus === "COMPLETED";

  async function handleUpdate() {
    try {
      setisLoading(true);

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: isCompleted ? "PENDING" : "COMPLETED",
        }),
      });

      if (!response.ok) {
        alert("Failed to update task");
        return;
      }

      router.refresh();
    } catch {
      alert("Something went wrong");
    } finally {
      setisLoading(false);
    }
  }

  return (
    <button
      onClick={handleUpdate}
      disabled={isLoading}
      className={`rounded-lg px-4 py-2 text-sm font-medium text-white cursor-pointer transition ${isCompleted ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-700"}`}
    >
      {isLoading ? "Updating.." : isCompleted ? "undo" : "Complete"}
    </button>
  );
}
