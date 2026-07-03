"use client";

import { Goal } from "@/types/goal";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

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
    <Modal open={true} title="Edit Goal" onClose={onClose}>
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
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
