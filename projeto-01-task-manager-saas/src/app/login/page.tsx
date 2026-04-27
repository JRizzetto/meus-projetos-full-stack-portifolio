"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //* 2 - Impede o navegador de recarregar a página */
    event.preventDefault();

    //* 3 - Limpa erro anterior (se existia) */
    setErrorMessage("");

    try {
      //* Muda botão para "Signing in..." */
      setIsLoading(true);

      // //*Envia para a URL http://localhost:3000/api/login*/
      // const response = await fetch("/api/login", {
      //   // Method: "POST" - Método HTTP (criar/processar)
      //   method: "POST",
      //   // headers diz que está enviando JSON
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   // Os dados convertidos para JSON
      //   body: JSON.stringify({
      //     email, // Valor do state
      //     password, // Valor do state
      //   }),
      // });

      // // Guarda a resposta recebida do backend e converte em objeto
      // const data = await response.json();

      // // Se os dados não forem validados no backend, retorna um erro
      // if (!response.ok) {
      //   setErrorMessage(data.message || "Invalid Login.");
      //   return;
      // }

      // // Se os dados forem validados, redireciona para a página de dashboard
      // router.push("/dashboard");

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("Invalid email or password");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Unable to login. Pelase try agin.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your dashboard and manage your tasks.
          </p>
        </div>
        {/*1 - Quando o botão Sign In é clicado é disparado onSubimit no formulário
        e a função handleSubmit é chamada */}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {errorMessage ? (
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white trasition hover:bg-indigo-700 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          don't have an account{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}
