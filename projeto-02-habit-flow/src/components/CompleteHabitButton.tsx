"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type CompleteHabitButtonProps = {
  habitId: string;
  isCompletedToday: boolean;
};

export default function CompleteHabitButton({
  habitId,
  isCompletedToday,
}: CompleteHabitButtonProps) {
  const router = useRouter();

  const [completing, setCompleting] = useState(false);

  async function handleCompleteHabit() {
    setCompleting(true);
    const response = await fetch(`/api/habits/${habitId}/complete`, {
      method: "POST",
    });

    if (response.ok) {
      toast.success("Habit completed successfully!");
      router.refresh();
    } else {
      toast.error("Failed to complet habit");
    }

    setCompleting(false);
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
      {completing && "Completing..."}
      {!completing && isCompletedToday && "Completed Today"}
      {!completing && !isCompletedToday && "Complete Today"}
    </button>
  );
}
