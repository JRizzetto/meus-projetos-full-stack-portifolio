"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      console.error("REGISTER_FORM_ERROR", error);
      toast.error("Unexpected error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-20 w-full max-w-md">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-emerald-400"
      >
        ← Back to Home
      </Link>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-2 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-800 p-8 text-white shadow-xl"
      >
        <div>
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Start tracking your finances with a modern dashboard
          </p>
        </div>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-emerald-500"
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-emerald-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-emerald-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
