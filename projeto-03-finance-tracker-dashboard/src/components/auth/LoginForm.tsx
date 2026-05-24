"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Login successful.");

      router.push("/dashboard");
    } catch (error) {
      console.error("LOGIN_ERROR", error);

      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-white shadow-xl"
    >
      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Login to continue managing your finances.
        </p>
      </div>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
