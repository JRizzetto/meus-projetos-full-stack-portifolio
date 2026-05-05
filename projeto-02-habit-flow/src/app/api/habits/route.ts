import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createHabitSchema } from "@/lib/validations/habit";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const data = createHabitSchema.parse(body);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const habit = await prisma.habit.create({
    data: {
      title: data.title,
      description: data.description,
      color: data.color,
      userId: user.id,
    },
  });

  return NextResponse.json(
    { message: "Habit created successfully", habit },
    { status: 201 },
  );
}
