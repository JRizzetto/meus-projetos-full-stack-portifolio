"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type CompletionRadialChartProps = {
  completionPercentage: number;
};

export default function CompletionRadialChart({
  completionPercentage,
}: CompletionRadialChartProps) {
  const data = [
    { name: "Completed", value: completionPercentage },
    { name: "Remaining", value: 100 - completionPercentage },
  ];

  const COLORS = ["#4f46e5", "#e2e8f0"];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Daily completion
          </h2>

          <p className="mt-1 text-sm text-slate-600">Your progress today</p>
        </div>

        <strong className="text-2xl font-bold text-indigo-600">
          {completionPercentage}%
        </strong>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={80}
              outerRadius={115}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
