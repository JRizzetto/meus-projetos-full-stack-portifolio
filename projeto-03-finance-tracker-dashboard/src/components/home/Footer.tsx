import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">
        <div className="max-w-md">
          <h3 className="text-2xl font-bold text-white">FinanceTracker</h3>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            A modern personal finance application built with Next.js,
            TypeScript, Prisma and PostgreSQL.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/"
                className="text-zinc-400 transition hover:text-emerald-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/login"
                className="text-zinc-400 transition hover:text-emerald-400"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                href="/register"
                className="text-zinc-400 transition hover:text-emerald-400"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Built With</h4>

          <ul className="space-y-3 text-sm text-zinc-400">
            <li>Next.js</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Prisma ORM</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} FinanceTracker. Built by Jefferson
        Rizzetto.
      </div>
    </footer>
  );
}
