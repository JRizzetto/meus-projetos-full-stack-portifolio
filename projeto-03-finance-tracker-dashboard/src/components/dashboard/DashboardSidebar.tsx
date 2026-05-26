export function DashboardSidebar() {
  return (
    <aside className="hidden w-72 border-r border-zinc-800 bg-zinc-950 p-6 lg:block">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        FinanceOS
      </h2>

      <nav className="mt-10 flex flex-col gap-3 text-sm">
        <a
          href="/dashboard"
          className="rounded-lg bg-zinc-900 px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          Overview
        </a>

        <a
          href="/dashboard/transactions"
          className="rounded-lg px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
        >
          Transactions
        </a>

        <a
          href="/dashboard/categories"
          className="rounded-lg px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
        >
          Categories
        </a>
      </nav>
    </aside>
  );
}
