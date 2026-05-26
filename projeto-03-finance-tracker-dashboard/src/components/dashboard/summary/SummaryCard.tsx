interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
}

export function SummaryCard({ title, value, description }: SummaryCardProps) {
  return (
    <div className="roudend-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-start justify-content">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>

          <h2 className="mt-4 text-3xl font-bold text-white">{value}</h2>

          <p className="mt-2 text-sm text-zinc-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
