import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
        Personal Finance Dashboard
      </span>

      <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl">
        Take control of your finances with confidence.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Track your income, expenses and financial goals in one modern, secure
        and intuitive dashboard.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
    </section>
  );
}
