"use client";

import { SummaryCard } from "./SummaryCard";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

export function SummaryCards() {
  const { metrics, isLoading } = useDashboardMetrics();

  if (isLoading) {
    return <p>Loading metrics...</p>;
  }

  if (!metrics) {
    return <p>Unable to load metrics.</p>;
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl-grid-cols-4">
      <SummaryCard
        title="Total Balance"
        value={`$${metrics.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        description="Current available balance"
      />

      <SummaryCard
        title="Monthly Income"
        value={`$${metrics.totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        description="Income this month"
      />

      <SummaryCard
        title="Monthly Expenses"
        value={`$${metrics.totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        description="Expenses this month"
      />

      <SummaryCard
        title="Savings Rate"
        value={`${metrics.savingsRate}%`}
        description="Monthly savings performance"
      />
    </section>
  );
}
