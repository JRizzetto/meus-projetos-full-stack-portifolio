import Image from "next/image";

export function DashboardPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30">
        <Image
          src="/dashboard-preview.png"
          alt="FinanceTracker Dashboard"
          width={1600}
          height={900}
          className="h-auto w-full"
          priority
        />
      </div>
    </section>
  );
}
