"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import toast from "react-hot-toast";
import { Category } from "@/types/transaction";

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

  const [editType, setEditType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editDate, setEditDate] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

      params.append("page", page.toString());

      const response = await fetch(`/api/transactions?${params.toString()}`);

      const data = await response.json();

      setTransactions(data.transactions);

      setTotalPages(data.totalPages);
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
      setIsDeleting(false);
      return;
    }

    setIsDeleting(true);

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
    } finally {
      setIsDeleting(false);
    }
  }

  function handleEdit(transaction: Transaction) {
    setSelectedTransaction(transaction);

    setEditTitle(transaction.title);
    setEditAmount(transaction.amount.toString());
    setEditDescription(transaction.description || "");

    setEditType(transaction.type);
    setEditCategoryId(transaction.categoryId);
    setEditDate(transaction.date.split("T")[0]);

    setIsEditModalOpen(true);
  }

  async function handleUpdate() {
    if (!selectedTransaction) {
      return;
    }

    setIsUpdating(true);

    if (!editTitle.trim()) {
      toast.error("Please enter a transaction title.");
      return;
    }

    if (Number(editAmount) <= 0) {
      toast.error("Amount must be greater than zero.");
      return;
    }

    if (!editDate) {
      toast.error("Please select a date.");
      return;
    }

    if (!editCategoryId) {
      toast.error("Please select a category.");
      return;
    }

    try {
      const response = await fetch(
        `/api/transactions/${selectedTransaction.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editTitle,
            amount: Number(editAmount),
            type: editType,
            categoryId: editCategoryId,
            date: editDate,
            description: editDescription,
          }),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Transaction updated successfully.");

      setIsEditModalOpen(false);

      await loadTransactions();
    } catch (error) {
      toast.error("Failed to update transaction.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function loadCategories() {
    const response = await fetch("/api/categories");

    const data = await response.json();

    setCategories(data);
  }

  useEffect(() => {
    loadTransactions();
    loadCategories();
  }, [search, type, categoryId, startDate, endDate, page]);

  useEffect(() => {
    setPage(1);
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
      <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
        <h3 className="text-xl font-semibold text-white">
          No transactions found
        </h3>
        <p className="mt-3 text-zinc-400">
          Create your first transaction or adjust your filters to see results.
        </p>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900//30 p-12 text-center">
        <h3 className="text-xl font-semibold text-white">
          No transactions yet
        </h3>
        <p className="mt-3 text-zinc-400">
          Create your first transaction to start tracking your finances.
        </p>
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

              <td className="p-4 text-white">
                $
                {Number(transaction.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>

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
                    {isDeleting ? "Deleting..." : "Delete"}
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

            <div className="mt-6 space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              />

              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                placeholder="Amount"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              />

              <select
                value={editType}
                onChange={(e) =>
                  setEditType(e.target.value as "INCOME" | "EXPENSE")
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              >
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </select>

              <select
                value={editCategoryId}
                onChange={(e) => setEditCategoryId(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                rows={4}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              ></textarea>
            </div>

            <button
              disabled={isUpdating}
              onClick={handleUpdate}
              className="mt-6 mr-2 rounded-xl bg-white px-4 py-2 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>

            <button
              disabled={isUpdating}
              onClick={() => setIsEditModalOpen(false)}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-zinc-400">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
