"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Goal } from "@/types/goal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

interface GoalFormProps {
  onGoalCreated: (goal: Goal) => void;
}

export function GoalForm({ onGoalCreated }: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a goal title.");
      return;
    }

    if (Number(targetAmount) <= 0) {
      toast.error("Target amount must be greater than 0.");
      return;
    }

    if (Number(currentAmount) < 0) {
      toast.error("Current amount cannot be negative.");
      return;
    }

    try {
      setIsSubmitting(true);
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

      const createdGoal: Goal = await response.json();

      toast.success("Goal created successfully.");

      setTitle("");
      setTargetAmount("");
      setCurrentAmount("");

      onGoalCreated(createdGoal);
    } catch {
      toast.error("Failed to create goal.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4"
      >
        <Input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        <Button type="submit">
          {isSubmitting ? "Creating..." : "Create Goal"}
        </Button>
      </form>
    </Card>
  );
}
