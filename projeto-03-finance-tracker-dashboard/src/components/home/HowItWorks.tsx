import { UserPlus, Wallet, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up in just a few seconds and securely access your personal dashboard.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Track your finances",
    description:
      "Register your income, expenses, categories and financial goals.",
    icon: Wallet,
  },
  {
    number: "03",
    title: "Grow with confidence",
    description:
      "Monitor your progress and make smarter financial decisions every day.",
    icon: TrendingUp,
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">
          Start in three simple steps
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          FinanceTracker makes personal finance management simple from day one.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition hover:border-emerald-500"
            >
              <span className="absolute right-6 top-6 text-5xl font-bold text-zinc-800">
                {step.number}
              </span>

              <div className="mb-6 inline-flex rounded-xl bg-emerald-500/10 p-3">
                <Icon className="h-7 w-7 text-emerald-400" />
              </div>

              <h3 className="text-xl font-semibold text-white">{step.title}</h3>

              <p className="mt-4 leading-7 text-zinc-400">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
