"use client";

import { GoalForm } from "@/components/dashboard/goals/GoalForm";
import { GoalsList } from "@/components/dashboard/goals/GoalsList";
import { GoalStats } from "@/components/dashboard/goals/GoalsStats";
import { useGoals } from "@/hooks/useGoals";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function GoalsPage() {
  const { goals, loading, removeGoal, updateGoal, addGoal } = useGoals();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="Financial Goals"
        description="Track your savings progress."
      />

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
