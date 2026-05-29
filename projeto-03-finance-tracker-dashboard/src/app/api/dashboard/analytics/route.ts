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

  const expenses = await prisma.transaction.findMany({
    where: {
      userId: user.id,
      type: "EXPENSE",
    },
    orderBy: {
      date: "asc",
    },
  });

  const monthlyData = expenses.reduce<Record<string, number>>(
    (acc, transaction) => {
      const month = new Date(transaction.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      acc[month] = (acc[month] || 0) + transaction.amount.toNumber();

      return acc;
    },
    {},
  );

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  return NextResponse.json(chartData);
}
