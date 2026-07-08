import Link from "next/link";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-zinc-900 p-12 text-center">
        <h2 className="text-4xl font-bold text-white">
          Ready to take control of your finances?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          Create your free account and start tracking your income, expenses and
          financial goals in one modern dashboard.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-emerald-500 px-8 py-4 font-medium text-zinc-950 transition hover:bg-emerald-400"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-zinc-700 px-8 py-4 font-medium text-white transition hover:bg-zinc-900"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
