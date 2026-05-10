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
      className={`rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer ${
        isCompletedToday
          ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
    >
      {isCompletedToday ? "Completed today" : "Complete today"}
    </button>
  );
}
