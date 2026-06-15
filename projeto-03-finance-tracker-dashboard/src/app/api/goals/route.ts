import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "unauthorized." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const goals = await prisma.goal.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(goals);
}

export async function POST(request: Request) {
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

  const body = await request.json();

  const goal = await prisma.goal.create({
    data: {
      title: body.title,
      targetAmount: body.targetAmount,
      currentAmount: body.currentAmount || 0,
      userId: user.id,
    },
  });

  return NextResponse.json(goal, {
    status: 201,
  });
}
