import { CategoryForm } from "@/components/dashboard/categories/CategoryForm";

export default function CategoriesPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Categories</h1>
        <p className="mt-2 text-zinc-400">
          Organize your income and expenses for better analytics.
        </p>
      </div>

      <CategoryForm />
    </section>
  );
}
