"use client";

import { TransactionForm } from "@/components/dashboard/transactions/TransactionForm";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { useState } from "react";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <TransactionsTable
        search={search}
        type={type}
        categoryId={categoryId}
        startDate={startDate}
        endDate={endDate}
      />
    </section>
  );
}
