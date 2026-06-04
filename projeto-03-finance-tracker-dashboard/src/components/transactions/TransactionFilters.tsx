"use client";

import { useEffect, useState } from "react";

interface TransactionFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  type: string;
  setType: (value: string) => void;

  categoryId: string;
  setCategoryId: (value: string) => void;
}

interface Category {
  id: string;
  name: string;
}

export function TransactionFilters({
  search,
  setSearch,
  type,
  setType,
  categoryId,
  setCategoryId,
}: TransactionFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await fetch("/api/categories");

      const data = await response.json();

      setCategories(data);
    }

    loadCategories();
  }, []);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
        >
          <option value="">All Types</option>

          <option value="INCOME">Income</option>

          <option value="EXPENSE">Expense</option>
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
