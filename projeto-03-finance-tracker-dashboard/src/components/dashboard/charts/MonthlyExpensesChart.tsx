"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ChartData {
  month: string;
  amount: number;
}

export function MonthlyExpensesChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/dashboard/analytics");
      const result = await response.json();

      setData(result);
    }

    loadData();
  }, []);

  if (!data.length) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">Monthly Expenses</h2>

        <p className="mt-4 text-zinc-400">No expense data available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Monthly Expenses</h2>

        <p className="mt-1 text-sm text-zinc-400">
          Track your spending trends over time.
        </p>
      </div>

      <div className="mt-6 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Bar dataKey="amount" fill="#f4f4f5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
