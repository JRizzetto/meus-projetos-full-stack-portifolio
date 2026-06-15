"use client";

import { Goal } from "@/types/goal";
import { useEffect, useState } from "react";

export function GoalsList() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

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
              <h3 className="text-lg font-semibold text-white">{goal.title}</h3>

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
          </div>
        );
      })}
    </div>
  );
}
