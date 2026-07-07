export function DashboardPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 shadow-2xl shadow-black/40">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">
            FinanceTracker Dashboard
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            Manage your finances in one place.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div className="rounded-2xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Total Balance</p>

            <h4 className="mt-3 text-3xl font-bold text-emerald-400">
              $12,580
            </h4>
          </div>

          <div className="rounded-2xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Income</p>

            <h4 className="mt-3 text-3xl font-bold text-white">$18,200</h4>
          </div>

          <div className="rounded-2xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Expenses</p>

            <h4 className="mt-3 text-3xl font-bold text-red-400">$5,620</h4>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-zinc-950 p-6">
            <h4 className="mb-6 text-lg font-semibold text-white">
              Monthly Overview
            </h4>

            <div className="flex h-48 items-end gap-3">
              {[45, 80, 60, 90, 70, 110, 95].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-xl bg-emerald-500"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-950 p-6">
            <h4 className="mb-6 text-lg font-semibold text-white">
              Recent Transactions
            </h4>

            <div className="space-y-4">
              {[
                ["Salary", "+ $3,500"],
                ["Groceries", "- $120"],
                ["Netflix", "- $15"],
                ["Freelance", "+ $800"],
              ].map(([title, amount]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3"
                >
                  <span className="text-zinc-300">{title}</span>

                  <span
                    className={
                      amount.startsWith("+")
                        ? "font-medium text-emerald-400"
                        : "font-medium text-red-400"
                    }
                  >
                    {amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
