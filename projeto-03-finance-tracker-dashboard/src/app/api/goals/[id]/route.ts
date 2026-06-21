import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  const { id } = await params;

  const goal = await prisma.goal.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!goal) {
    return NextResponse.json({ message: "Goal not found." }, { status: 404 });
  }

  await prisma.goal.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Goal deleted successfully.",
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  const { id } = await params;

  const goal = await prisma.goal.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!goal) {
    return NextResponse.json({ message: "Goal not found." }, { status: 404 });
  }

  const body = await request.json();

  const updatedGoal = await prisma.goal.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      targetAmount: body.targetAmout,
      currentAmount: body.currentAmount,
    },
  });

  return NextResponse.json(updatedGoal);
}
