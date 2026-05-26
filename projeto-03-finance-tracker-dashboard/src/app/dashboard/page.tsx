import { SummaryCards } from "@/components/dashboard/summary/SummaryCards";

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
    </section>
  );
}
