"use client";

import { Goal } from "@/types/goal";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoalEditModal } from "./GoalEditModal";
import { Button } from "@/components/ui/Button";

interface GoalsListProps {
  goals: Goal[];
  onGoalDeleted: (id: string) => void;
  onGoalUpdated: (goal: Goal) => void;
}

export function GoalsList({
  goals,
  onGoalDeleted,
  onGoalUpdated,
}: GoalsListProps) {
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Goal deleted successfully.");

      onGoalDeleted(id);
    } catch (error) {
      toast.error("Failed to delete goal");
    }
  }

  if (!goals.length) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
        <h3 className="text-xl font-semibold text-shite">
          No financial goals yet
        </h3>

        <p className="mt-3 text-zinc-400">
          Create your first goal and start tracking your savings progress
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => {
          const progress =
            (Number(goal.currentAmount) / Number(goal.targetAmount)) * 100;

          const percentage = Math.min(progress, 100);

          return (
            <div
              key={goal.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {goal.title}
                </h3>

                <span className="text-sm text-zinc-400">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <p className="mt-4 text-zinc-300">
                ${Number(goal.currentAmount).toLocaleString()}
                {" / "}${Number(goal.targetAmount).toLocaleString()}
              </p>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <div className="mt-6 gap-2 flex justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setEditingGoal(goal)}
                >
                  Edit
                </Button>

                <Button variant="danger" onClick={() => handleDelete(goal.id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {editingGoal && (
        <GoalEditModal
          goal={editingGoal}
          onClose={() => setEditingGoal(null)}
          onSuccess={(updatedGoal) => {
            setEditingGoal(null);
            onGoalUpdated(updatedGoal);
          }}
        />
      )}
    </>
  );
}
