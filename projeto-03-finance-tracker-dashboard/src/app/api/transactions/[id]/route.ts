import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateTransactionSchema } from "@/lib/validations/transaction";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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
    return NextResponse.json({ message: "user not found!" }, { status: 404 });
  }

  const transaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId: user?.id,
    },
  });

  if (!transaction) {
    return NextResponse.json(
      { message: "Transaction not found!" },
      { status: 404 },
    );
  }

  await prisma.transaction.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Transaction deleted successfully.",
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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
    return NextResponse.json({ message: "User not found!" }, { status: 404 });
  }

  const transaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId: user?.id,
    },
  });

  if (!transaction) {
    return NextResponse.json(
      { message: "Transaction not found!" },
      { status: 404 },
    );
  }

  const body = await request.json();

  const validatedData = updateTransactionSchema.parse(body);

  const updatedTransaction = await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      title: validatedData.title,
      amount: validatedData.amount,
      type: validatedData.type,
      categoryId: validatedData.categoryId,
      date: new Date(validatedData.date),
      description: validatedData.description,
    },
  });

  return NextResponse.json(updatedTransaction);
}
