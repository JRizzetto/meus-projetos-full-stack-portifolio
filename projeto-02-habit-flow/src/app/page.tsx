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
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
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
                <p className="mt-1 text-sm text-slate-500">
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
                <span className="font-medium text-slate-800">{habit}</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Done
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-indigo-600">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Build consistency with simple and useful features.
            </h2>

            <p className="mt-4 text-slate-600">
              HabitFlow helps you organize your habits, track daily progress,
              and understand your consistency over time.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                ✓
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Track daily habits
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Create habits, mark them as completed, and keep your daily
                routine organized.
              </p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                ↗
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Build consistency
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Follow your current and best streaks to stay motivated over
                time.
              </p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                %
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Visualize progress
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use clear metrics and charts to understand how your habits are
                evolving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              Dashboard preview
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              See your habits, progress, and streaks in one place.
            </h2>

            <p className="mt-4 text-slate-600">
              HabitFlow gives you a clean dashboard to understand your daily
              progress, check completed habits, and follow your consistency over
              time.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border bg-white p-4">
                <p className="text-sm font-medium text-slate-900">
                  Daily completion chart
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Quickly understand how much of your routine you completed
                  today.
                </p>
              </div>

              <div className="rounded-xl border bg-white p-4">
                <p className="text-sm font-medium text-slate-900">
                  Streak tracking
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Follow your current and best streaks for each habit.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Daily completion
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your progress today
                  </p>
                </div>

                <strong className="text-2xl font-bold text-indigo-600">
                  67%
                </strong>
              </div>

              <div className="mx-auto mt-8 h-40 w-40 rounded-full border-[24px] border-slate-200 border-r-indigo-600 border-b-indigo-600" />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Study English", "Workout"].map((habit) => (
                <div key={habit} className="rounded-2xl border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">{habit}</p>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Done
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Current</p>
                      <strong className="text-sm text-slate-900">4 days</strong>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Best</p>
                      <strong className="text-sm text-slate-900">7 days</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-indigo-600">
              Analytics and insights
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Understand your habits with clear visual metrics.
            </h2>

            <p className="mt-4 text-slate-600">
              Track your completion rate, monitor streaks, and stay motivated
              with clean and simple analytics.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border bg-slate-50 p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Weekly completion
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    78% average
                  </h3>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  +12% this week
                </span>
              </div>

              <div className="flex h-40 items-end justify-between gap-3">
                {[40, 60, 75, 50, 90, 70, 85].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t-2xl bg-indigo-600"
                      style={{ height: `${height}%` }}
                    />

                    <span className="rounded-2xl bg-indigo-600 px-2 py-2 text-xs text-white">
                      {["M", "T", "W", "T", "F", "S", "S"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">Best streak</p>

              <h3 className="mt-2 text-5xl font-bold text-slate-900">21</h3>

              <p className="mt-2 text-sm text-slate-600">days of consistency</p>

              <div className="mt-8 rounded-2xl bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Current progress
                  </span>

                  <span className="text-sm font-medium text-indigo-600">
                    67%
                  </span>
                </div>

                <div className="mt-3 h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-2/3 rounded-full bg-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
