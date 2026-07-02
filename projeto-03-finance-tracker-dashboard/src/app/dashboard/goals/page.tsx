"use client";

import { GoalForm } from "@/components/dashboard/goals/GoalForm";
import { GoalsList } from "@/components/dashboard/goals/GoalsList";
import { GoalStats } from "@/components/dashboard/goals/GoalsStats";
import { useGoals } from "@/hooks/useGoals";

export default function GoalsPage() {
  const { goals, loading, removeGoal, updateGoal, addGoal } = useGoals();

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Financial Goals</h1>

        <p className="mt-2 text-zinc-400">Track your savings progress.</p>
      </div>

      {!loading && (
        <>
          <GoalStats goals={goals} />

          <GoalForm onGoalCreated={addGoal} />

          <GoalsList
            goals={goals}
            onGoalDeleted={removeGoal}
            onGoalUpdated={updateGoal}
          />
        </>
      )}
    </section>
  );
}
