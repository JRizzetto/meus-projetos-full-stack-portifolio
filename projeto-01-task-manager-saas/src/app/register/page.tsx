"use client";

import React, { useState } from "react";

export default function registerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //* 2 - Impede o navegador de recarregar a página */
    event.preventDefault();

    // 3 - Limpa erro anterior (se existia)
    setErrorMessage("");
    setSuccessMessage("");

    // - 4 Se as senhas forem diferentes lança um erro
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Muda botão para "Signing in..."
      setIsLoading(true);

      //*Envia para a URL http://localhost:3000/api/register*/
      const response = await fetch("/api/register", {
        // Method: "POST" - Método HTTP (criar/processar)
        method: "POST",
        // headers diz que está enviando JSON
        headers: {
          "Content-Type": "application/json",
        },
        // Os dados convertidos para JSON
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      // Guarda a resposta recebida do backend e converte em objeto
      const data = await response.json();

      // Se os dados não forem validados no backend, retorna um erro
      if (!response.ok) {
        setErrorMessage(data.message || "Something went wrong.");
        return;
      }

      // Se os dados forem validados, mostra a mensagem de sucesso
      setSuccessMessage("Account created successfully.");

      // Limpa todos os inputs
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setErrorMessage("Unable to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="border border-gray-200 bg-white p-8 shadow-sm w-full max-w-md rounded-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-900">
            Start organizing your tasks and boost your productivity.
          </p>
        </div>
        {/*1 - Quando o botão Sign In é clicado é disparado onSubimit no formulário
        e a função handleSubmit é chamada */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {errorMessage ? (
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
          ) : null}

          {successMessage ? (
            <p className="text-sm font-medium text-green-600">
              {successMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 cursor-pointer"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-700 ml-2"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
