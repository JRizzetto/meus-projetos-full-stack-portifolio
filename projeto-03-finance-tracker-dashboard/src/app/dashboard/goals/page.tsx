"use client";

import { useEffect, useState } from "react";

import { Goal } from "@/types/goal";

import { GoalsList } from "@/components/dashboard/goals/GoalsList";
import { GoalForm } from "@/components/dashboard/goals/GoalForm";
import { GoalStats } from "@/components/dashboard/goals/GoalsStats";

export default function GoalsPage() {
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

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Financial Goals</h1>

        <p className="mt-2 text-zinc-400">Track your savings progress.</p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
          Loading statistics
        </div>
      ) : (
        <GoalStats goals={goals} />
      )}

      <GoalForm />

      {loading ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
          Loading statistics
        </div>
      ) : (
        <GoalsList goals={goals} />
      )}
    </section>
  );
}
