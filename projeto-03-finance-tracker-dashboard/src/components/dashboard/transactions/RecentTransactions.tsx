"use client";

import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
}

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await fetch("/api/transactions");
        const data = await response.json();

        setTransactions(data.slice(0, 5));
      } catch (error) {
        console.error("LOAD_TRANSACTIONS_ERROR", error);
      }
    }

    loadTransactions();
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-xl font-semibold text-white">Recent Transactions </h2>

      <div className="mt-6 space-y-4">
        {transactions.length === 0 ? (
          <p className="text-zinc-400">No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex item-center justify-between border-b border-zinc-800 pb-3"
            >
              <div>
                <p className="font-medium text-white">{transaction.title}</p>
                <p className="text-sm text-zinc-400">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>

              <span
                className={
                  transaction.type === "INCOME"
                    ? "font-medium text-emerald-400"
                    : "font-medium text-red-400"
                }
              >
                {transaction.type === "INCOME" ? "+" : "-"}$
                {Number(transaction.amount).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
