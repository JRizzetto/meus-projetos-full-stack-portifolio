"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-xl font-semibold text-white">Monthly Expenses</h2>

      <div className="mt-6 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
