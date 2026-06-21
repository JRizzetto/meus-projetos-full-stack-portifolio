"use client";

import { Goal } from "@/types/goal";
import { useState } from "react";
import toast from "react-hot-toast";

interface GoalEditModalProps {
  goal: Goal;
  onClose: () => void;
  onSuccess: () => void;
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
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

      toast.success("Goal updated successfully.");

      onSuccess();
    } catch {
      toast.error("Failed to update goal.");
    }
  }
}
