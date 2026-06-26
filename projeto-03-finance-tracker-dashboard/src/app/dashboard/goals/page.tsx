"use client";

import { useEffect, useState } from "react";

import { Goal } from "@/types/goal";

import { GoalsList } from "@/components/dashboard/goals/GoalsList";
import { GoalForm } from "@/components/dashboard/goals/GoalForm";
import { GoalStats } from "@/components/dashboard/goals/GoalsStats";

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

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

  function removeGoal(id: string) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }

  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Financial Goals</h1>

        <p className="mt-2 text-zinc-400">Track your savings progress.</p>
      </div>

      {!loading && (
        <>
          <GoalStats goals={goals} />

          <GoalForm onGoalCreated={loadGoals} />

          <GoalsList
            goals={goals}
            onGoalsChanged={loadGoals}
            onGoalDeleted={removeGoal}
          />
        </>
      )}
    </section>
  );
}
