import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateHabitSchema } from "@/lib/validations/habit";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: Request, { params }: Params) {
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

  await prisma.habit.delete({
    where: {
      id: habit.id,
    },
  });

  return NextResponse.json({ message: "Habit deleted successfully" });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const data = updateHabitSchema.parse(body);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "user not found!" }, { status: 404 });
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

  const updateHabit = await prisma.habit.update({
    where: {
      id: habit.id,
    },
    data,
  });

  return NextResponse.json({
    message: "Habit updated successfully",
    habit: updateHabit,
  });
}
