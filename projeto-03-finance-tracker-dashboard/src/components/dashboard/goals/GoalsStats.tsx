import { Goal } from "@/types/goal";

interface GoalStatsProps {
  goals: Goal[];
}

export function GoalStats({ goals }: GoalStatsProps) {
  const totalGoals = goals.length;

  const totalTarget = goals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount),
    0,
  );

  const totalSaved = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount),
    0,
  );

  const overrallProgress =
    totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div>
      <div>
        <p>Total Goals</p>

        <h3>{totalGoals}</h3>
      </div>
    </div>
  );
}
