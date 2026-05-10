import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardSidebar />

      <main className="min-h-screen md:pl-64">{children}</main>
    </div>
  );
}
