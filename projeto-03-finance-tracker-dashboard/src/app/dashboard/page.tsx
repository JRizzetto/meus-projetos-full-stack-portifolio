import { SummaryCards } from "@/components/dashboard/summary/SummaryCards";
import { RecentTransactions } from "@/components/dashboard/transactions/RecentTransactions";
import { MonthlyExpensesChart } from "@/components/dashboard/charts/MonthlyExpensesChart";
import { CategoryDistributionChart } from "@/components/dashboard/charts/CategoryDistributionChart";

export default function DashboardPage() {
  return (
    <section className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-white">
          Financial Overview
        </h1>

        <p className="mt-2 text-zinc-400">
          Monitor your financial health and monthly performance.
        </p>
      </div>

      <SummaryCards />

      <RecentTransactions />

      <MonthlyExpensesChart />

      <CategoryDistributionChart />
    </section>
  );
}
