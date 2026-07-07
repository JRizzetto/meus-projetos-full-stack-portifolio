import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold text-white transation hover:text-emerald-400"
        >
          Financial Tracker
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="login"
            className="rounded-lg px-4 py-2 text-zinc-300 transaction hover:bg-zinc-900 hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-emerald-500 px-5 py-2 font-medium text-zinc-950 transition hover:bg-emerald-400"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
