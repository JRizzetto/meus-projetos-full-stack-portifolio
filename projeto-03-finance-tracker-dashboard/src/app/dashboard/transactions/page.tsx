"use client";

import { TransactionForm } from "@/components/dashboard/transactions/TransactionForm";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { useState } from "react";

interface TransactionsTableProps {
  search: string;
  type: string;
  categoryId: string;
}

export default function TransactionsPage() {
  const [search, setSearch] = useState();
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Transactions</h1>
        <p className="mt-2 text-zinc-400">Register your income and expenses.</p>
      </div>

      <TransactionForm />

      <TransactionFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />

      <TransactionsTable search={search} type={type} categoryId={categoryId} />
    </section>
  );
}
