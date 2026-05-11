"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const links = [
  {
    label: "Overview",
    href: "/dashboard",
  },
  {
    label: "Habits",
    href: "/dashboard/habits",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-white p-6 md:block">
        <div>
          <p className="text-sm font-medium text-indigo-600">HabitFlow</p>
          <h1 className="mt-1 text-xl font-bold text-slate-900">Dashboard</h1>
        </div>

        <nav className="mt-8 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8">
          <LogoutButton />
        </div>
      </aside>

      <div className="border-b bg-white px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-indigo-600">HabitFlow</p>
            <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
          </div>

          <LogoutButton />
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
