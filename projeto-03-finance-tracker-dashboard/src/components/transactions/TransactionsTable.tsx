"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import toast from "react-hot-toast";

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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDescription, setEditDescription] = useState("");

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

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Transaction deleted successfully.");

      loadTransactions();
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  }

  useEffect(() => {
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

  function handleEdit(transaction: Transaction) {
    setSelectedTransaction(transaction);

    setEditTitle(transaction.title);
    setEditAmount(transaction.amount.toString());
    setEditDescription(transaction.description || "");

    setIsEditModalOpen(true);
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

            <th className="p-4 text-left text-zinc-400">Actions</th>
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

              <td className="p-4">
                {" "}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-zinc-800 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="rounded-lg border border-red-900/50 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-950/30 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold text-white">
              Edit Transaction
            </h2>

            <p className="mt-2 text-zinc-400">{selectedTransaction.title}</p>

            <button
              onClick={() => setIsEditModalOpen(false)}
              className="mt-6 rounded-xl border border-zinc-700 px-4 py-2 text-white
        "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
