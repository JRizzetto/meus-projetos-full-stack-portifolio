import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/schemas/transaction-schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type");
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "user not found." }, { status: 404 });
  }

  const filters: {
    userId: string;
    type?: "INCOME" | "EXPENSE";
    categoryId?: string;
    title?: {
      contains: string;
      mode: "insensitive";
    };
  } = {
    userId: user.id,
  };

  if (type === "INCOME" || type === "EXPENSE") {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  if (search) {
    filters.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const transactions = await prisma.transaction.findMany({
    where: filters,
    include: {
      category: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = transactionSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const category = await prisma.category.findFirst({
      where: {
        id: validatedData.categoryId,
        userId: user.id,
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 },
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        title: validatedData.title,
        amount: validatedData.amount,
        type: validatedData.type,
        date: new Date(validatedData.date),
        description: validatedData.description,
        userId: user.id,
        categoryId: validatedData.categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(
      {
        message: "Transaction created successfully.",
        transaction,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE_TRANSACTION_ERROR", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
