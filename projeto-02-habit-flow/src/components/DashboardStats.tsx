type DashboardStatsProps = {
  totalHabits: number;
  completedToday: number;
  completionPercentage: number;
};
export default function DashboardStats({
  totalHabits,
  completedToday,
  completionPercentage,
}: DashboardStatsProps) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Total habits</p>
        <strong className="mt-2 block text-3xl font-bold text-slate-900">
          {totalHabits}
        </strong>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Completed Today</p>
        <strong className="mt-2 block text-3xl font-bold text-slate-900">
          {completedToday}
        </strong>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Completion</p>
        <strong className="mt-2 block text-3xl font-bold text-indigo-600">
          {completionPercentage}%
        </strong>

        <div className="mt-4 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-all"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
