"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";

interface TransactionsTableProps {
  search: string;
  type: string;
  categoryId: string;
  startDate: string;
  endDate: string;
}

export function TransactionsTable({
  search,
  type,
  categoryId,
  startDate,
  endDate,
}: TransactionsTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const params = new URLSearchParams();

        if (search) {
          params.append("search", search);
        }

        if (type) {
          params.append("type", type);
        }

        if (categoryId) {
          params.append("categoryId", categoryId);
        }

        if (startDate) {
          params.append("startDate", startDate);
        }

        if (endDate) {
          params.append("endDate", endDate);
        }

        const response = await fetch(`/api/transactions?${params.toString()}`);

        const data = await response.json();

        setTransactions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, [search, type, categoryId, startDate, endDate]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
        Loading transactions...
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="p-4 text-left text-zinc-400">Title</th>

            <th className="p-4 text-left text-zinc-400">Category</th>

            <th className="p-4 text-left text-zinc-400">Type</th>

            <th className="p-4 text-left text-zinc-400">Amount</th>

            <th className="p-4 text-left text-zinc-400">Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-zinc-800">
              <td className="p-4 text-white">{transaction.title}</td>

              <td className="p-4">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: transaction.category.color,
                    }}
                  />

                  <span className="text-zinc-300">
                    {transaction.category.name}
                  </span>
                </span>
              </td>

              <td className="p-4 text-zinc-300">{transaction.type}</td>

              <td className="p-4 text-white">${transaction.amount}</td>

              <td className="p-4 text-zinc-300">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
