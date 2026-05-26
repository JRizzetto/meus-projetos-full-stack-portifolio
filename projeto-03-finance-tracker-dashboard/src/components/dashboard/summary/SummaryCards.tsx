import { SummaryCard } from "./SummaryCard";

export function SummaryCards() {
  return (
    <section>
      <SummaryCard
        title="Total Balance"
        value="$12,450.00"
        description="Current available balance"
      />

      <SummaryCard
        title="Monthly Income"
        value="$8,200.00"
        description="Income this month"
      />

      <SummaryCard
        title="Monthly Expenses"
        value="$3,750.00"
        description="Expenses this month"
      />

      <SummaryCard
        title="Savings Rate"
        value="42%"
        description="Monthly savings performance"
      />
    </section>
  );
}
