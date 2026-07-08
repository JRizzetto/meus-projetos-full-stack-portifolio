import { DollarSign, CreditCard, Target, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Track Income",
    description:
      "Keep track of every source of income with an organized and intuitive interface.",
    icon: DollarSign,
  },
  {
    title: "Manage Expenses",
    description:
      "Record and categorize your expenses to better understand your spending.",
    icon: CreditCard,
  },
  {
    title: "Financial Goals",
    description: "Create savings goals and monitor your progress over time.",
    icon: Target,
  },
  {
    title: "Dashboard Analythics",
    description:
      "Visualize your financial situation with a clean and modern dashboard.",
    icon: BarChart3,
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">
          Everything you need to manage your finances
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          FinanceTracker provide all the tools you need to organize your
          personal finances in one secure and intuitive application.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:-tranlate-y-1 hover:border-emerald-500"
            >
              <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3">
                <Icon className="h-6 w-6 text-emerald-400" />
              </div>

              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
