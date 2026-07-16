"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/dashboard/transactions",
    label: "Transactions",
  },
  {
    href: "/dashboard/categories",
    label: "Categories",
  },
  {
    href: "/dashboard/goals",
    label: "Goals",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r border-zinc-800 bg-zinc-950 p-6 lg:block">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        FinanceTracker
      </h2>

      <nav className="mt-10 flex flex-col gap-3 text-sm">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-3 transition ${isActive ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
