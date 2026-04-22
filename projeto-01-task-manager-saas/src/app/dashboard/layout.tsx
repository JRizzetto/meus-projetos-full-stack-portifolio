import Link from "next/link";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-5">
            <h1 className="text-2xl font-bold text-indigo-600">taskFlow</h1>
          </div>

          <nav className="flex flex-col gap-2 px-4 py-6">
            <Link
              href="/dashboard"
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/tasks"
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600"
            >
              Tasks
            </Link>
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Welcome back
              </h2>
              <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                Jefferson
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
