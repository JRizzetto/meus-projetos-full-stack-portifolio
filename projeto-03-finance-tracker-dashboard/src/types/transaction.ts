export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  description?: string | null;
  categoryId: string;

  category: {
    id: string;
    name: string;
    color: string;
  };
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
