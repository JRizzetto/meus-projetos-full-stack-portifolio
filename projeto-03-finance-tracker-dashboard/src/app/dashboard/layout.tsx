import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { deflate } from "zlib";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <div>
        <aside>
          <h2>FinanceOS</h2>

          <nav>
            <a href="/dashboard">Overview</a>
            <a href="/dashboard/transactions">Transactions</a>
            <a href="/dashboard/categories">Categories</a>
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
