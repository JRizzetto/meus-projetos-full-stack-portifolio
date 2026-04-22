import Link from "next/link";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <div>
        <aside>
          <div>
            <h1>taskFlow</h1>
          </div>

          <nav>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard">Tasks</Link>
          </nav>
        </aside>

        <div>
          <header>
            <div>
              <h2>Welcome back</h2>
              <div>Jefferson</div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
