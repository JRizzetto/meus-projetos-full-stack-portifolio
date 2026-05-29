"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  color: string;
}

export function TransactionForm() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("LOAD_CATEGORIES_ERROR", error);
      }
    }

    loadCategories();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          type,
          date,
          description,
          categoryId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      toast.success("Transaction created successfully.");

      setTitle("");
      setAmount("");
      setDate("");
      setDescription("");
      setCategoryId("");
    } catch (error) {
      console.error("CREATE_TRANSACTION_ERROR", error);

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
      <h2 className="text-xl font-semibold text-white">Create transaction</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Transaction title"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
        />

        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount"
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
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
        />

        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
        >
          <option value="">Select category</option>

          {categories
            .filter((category) => category.type === type)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>

        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description (optional)"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
        />
      </div>

      <button
        disabled={isLoading}
        className="mt-6 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-400 disabled:opacity-70 cursor-pointer"
      >
        {isLoading ? "Creating..." : "Create transaction"}
      </button>
    </form>
  );
}
