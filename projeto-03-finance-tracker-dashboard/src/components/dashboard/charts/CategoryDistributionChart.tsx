"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CategoryData {
  name: string;
  amount: number;
  color: string;
}

export function CategoryDistributionChart() {
  const [data, setData] = useState<CategoryData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/dashboard/category-distribution");

      const result = await response.json();

      setData(result);
    }

    loadData();
  }, []);

  if (!data.length) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">Expense Categories</h2>

        <p className="mt-4 text-zinc-400">No expense data available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Expense Categories</h2>

        <p className="mt-1 text-sm text-zinc-400">
          Distribution of expenses by category.
        </p>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="amount" nameKey="name" outerRadius={120}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
