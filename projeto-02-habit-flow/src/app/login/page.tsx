"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loging, setLoging] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoging(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/dashboard");
    }

    setLoging(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-indigo-600">
          <Link href="/" className="transition hover:text-indigo-800">
            HabitFlow
          </Link>
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome back</h1>

        <p className="mt-2 text-sm text-slate-600">
          Sign in to continue tracking your habits.
        </p>

        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 cursor-pointer">
            {loging ? "loging..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
