"use client";

import { TransactionForm } from "@/components/dashboard/transactions/TransactionForm";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <section className="space-y-8">
      <PageHeader
        title="Transactions"
        description="Register your income and expenses."
      />

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
