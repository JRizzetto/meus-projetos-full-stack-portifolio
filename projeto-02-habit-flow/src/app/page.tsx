import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-indigo-600">
            HabitFlow
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-indigo-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Habit tracking made simple
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Build better habits with progress you can actually see.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Create habits, complete them daily, track your consistency, and
            visualize your progress with a clean dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:-bg-indigo-700"
            >
              Start tracking
            </Link>
            <Link
              href="/login"
              className="rounded-xl border bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Today&apos;s progress
            </p>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-slate-900">75%</p>
                <p className="mt-1 text-sm text-salte-500">
                  3 of 4 habits completed
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                On track
              </span>
            </div>

            <div className="mt-5 h-3 rounded-full bg-slate-200">
              <div className="h-3 w-3/4 rounded-full bg-indigo-600" />
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {["Study English", "Workout", "Read 20 pages"].map((habit) => (
              <div
                key={habit}
                className="flex items-center justify-between rounded-2xl border bg-white p-4"
              >
                <span className="font-medium text-salte-800">{habit}</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-s font-medium text-green-700">
                  Done
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
