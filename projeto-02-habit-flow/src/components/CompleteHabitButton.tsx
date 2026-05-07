"use client";

import { useRouter } from "next/navigation";

type CompleteHabitButtonProps = {
  habitId: string;
  isCompletedToday: boolean;
};

export default function CompleteHabitButton({
  habitId,
  isCompletedToday,
}: CompleteHabitButtonProps) {
  const router = useRouter();

  async function handleCompleteHabit() {
    const response = await fetch(`/api/habits/${habitId}/complete`, {
      method: "POST",
    });

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleCompleteHabit}
      className={`rounded px-3 py-2 text-sm text-white cursor-pointer ${isCompletedToday ? "bg-gray-500" : "bg-green-600"}`}
    >
      {isCompletedToday ? "Completed today" : "Complete today"}
    </button>
  );
}
