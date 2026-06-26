"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface GoalFormProps {
  onGoalCreated: () => void;
}

export function GoalForm({ onGoalCreated }: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          targetAmount: Number(targetAmount),
          currentAmount: Number(currentAmount),
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Goal created successfully.");

      setTitle("");
      setTargetAmount("");
      setCurrentAmount("");

      onGoalCreated();
    } catch {
      toast.error("Failed to create goal.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4"
    >
      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
      />

      <input
        type="number"
        placeholder="Target amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
      />

      <input
        type="number"
        placeholder="Current amount"
        value={currentAmount}
        onChange={(e) => setCurrentAmount(e.target.value)}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
      />

      <button
        type="submit"
        className="rounded-xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-500 cursor-pointer"
      >
        Create Goal
      </button>
    </form>
  );
}
