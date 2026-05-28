import { TransactionForm } from "@/components/dashboard/transactions/TransactionForm";

export default function TransactionsPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Transactions</h1>
        <p className="mt-2 text-zinc-400">Register your income and expenses.</p>
      </div>

      <TransactionForm />
    </section>
  );
}
