"use client";

import { Goal } from "@/types/goal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoalEditModal } from "./GoalEditModal";

export function GoalsList() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    async function loadGoals() {
      try {
        const response = await fetch("/api/goals");

        const data = await response.json();

        setGoals(data);
      } catch (error) {
        console.error("LOAD_GOALS_ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    loadGoals();
  }, []);

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

      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch (error) {
      toast.error("Failed to delete goal");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
        Loading goals...
      </div>
    );
  }

  if (!goals.length) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
        No goals found.
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
              className="rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all bg-zinc-900/50 shadow-lg shadow-black/20 p-6"
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
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setEditingGoal(goal)}
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 cursor-pointer mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(goal.id)}
                  className="rounded-xl border border-red-900/50 px-4 py-2 text-sm text-red-400 transition hover:bg-red-950/30 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingGoal && (
        <GoalEditModal
          goal={editingGoal}
          onClose={() => setEditingGoal(null)}
          onSuccess={() => {
            setEditingGoal(null);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}
