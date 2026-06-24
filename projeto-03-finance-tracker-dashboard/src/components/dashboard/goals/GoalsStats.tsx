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
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-center items-center">
        <p className="text-sm text-zinc-400">Total Goals</p>

        <h3 className="mt-2 text-2xl font-semibold text-white">{totalGoals}</h3>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-center items-center">
        <p className="text-sm text-zinc-400">Target Savings</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">
          ${totalTarget.toLocaleString()}
        </h3>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-center items-center">
        <p className="text-sm text-zinc-400">Saved So Far</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">
          ${totalSaved.toLocaleString()}
        </h3>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-center items-center">
        <p className="text-sm text-zinc-400">Overall Progress</p>
        <h3 className="mt-2 text-2xl font-semibold text-emerald-400">
          {overrallProgress.toFixed(0)}%
        </h3>
      </div>
    </div>
  );
}
