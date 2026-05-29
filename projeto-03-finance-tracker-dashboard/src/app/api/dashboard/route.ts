import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
    },
  });

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((acc, transaction) => acc + transaction.amount.toNumber(), 0);
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((acc, transaction) => acc + transaction.amount.toNumber(), 0);

  const totalBalance = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
      ? Number(((totalBalance / totalIncome) * 100).toFixed(1))
      : 0;

  return NextResponse.json({
    totalIncome,
    totalExpenses,
    totalBalance,
    savingsRate,
  });
}
