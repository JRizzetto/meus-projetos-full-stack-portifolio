"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function CategoryForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [color, setColor] = useState("#ef4444");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type, color }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      toast.success("Category created successfully.");
      setName("");
    } catch (error) {
      console.error("CREATE_CATEGORY_FORM_ERROR", error);
      toast.error("Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <h2 className="text-xl font-semibold text-white">Create category</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Category name"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
        />

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="h-12 rounded-lg border border-zinc-800 bg-zinc-950 px-2"
        />

        <button
          disabled={isLoading}
          className="rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-400 disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? "Creating..." : "Create category"}
        </button>
      </div>
    </form>
  );
}
