import { UserMenu } from "./UserMenu";

interface DashboardTopbarProps {
  userName?: string | null;
  userEmail?: string | null;
}

export function DashboardTopbar({ userName, userEmail }: DashboardTopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Financial Dashboard
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Monitor your financial performance and analytics.
        </p>
      </div>

      <UserMenu userName={userName} userEmail={userEmail} />
    </header>
  );
}
