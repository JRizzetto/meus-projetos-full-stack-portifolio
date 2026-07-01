"use client";

import { Goal } from "@/types/goal";
import { useState } from "react";
import toast from "react-hot-toast";

interface GoalEditModalProps {
  goal: Goal;
  onClose: () => void;
  onSuccess: (updatedGoal: Goal) => void;
}

export function GoalEditModal({
  goal,
  onClose,
  onSuccess,
}: GoalEditModalProps) {
  const [title, setTitle] = useState(goal.title);
  const [targetAmount, setTargetAmount] = useState(String(goal.targetAmount));
  const [currentAmount, setCurrentAmount] = useState(
    String(goal.currentAmount),
  );

  const [isSubmitting, setisSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Pelase enter a goal title.");
      return;
    }

    if (Number(targetAmount) <= 0) {
      toast.error("target amount must be greater than 0");
      return;
    }

    if (Number(currentAmount) < 0) {
      toast.error("Current amount cannot be negative.");
      return;
    }

    try {
      setisSubmitting(true);
      const response = await fetch(`/api/goals/${goal.id}`, {
        method: "PUT",
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

      const updatedGoal: Goal = await response.json();

      toast.success("Goal updated successfully.");

      onSuccess(updatedGoal);
    } catch {
      toast.error("Failed to update goal.");
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">Edit Goal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
            placeholder="Goal title"
          />

          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
            placeholder="Target amount"
          />

          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white"
            placeholder="Current amount"
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
