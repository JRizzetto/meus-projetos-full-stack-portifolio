import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const habit = await prisma.habit.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!habit) {
    return NextResponse.json({ message: "Habit not found" }, { status: 404 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingCompletion = await prisma.habitCompletion.findUnique({
    where: {
      habitId_date: {
        habitId: habit.id,
        date: today,
      },
    },
  });

  if (existingCompletion) {
    await prisma.habitCompletion.delete({
      where: {
        id: existingCompletion.id,
      },
    });

    return NextResponse.json({
      message: "Habit marked as incomplete",
      completed: false,
    });
  }

  await prisma.habitCompletion.create({
    data: {
      habitId: habit.id,
      date: today,
    },
  });

  return NextResponse.json({
    message: "Habit marked as completed",
    completed: true,
  });
}
