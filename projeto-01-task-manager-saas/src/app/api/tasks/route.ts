import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  dueDate: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const parseData = createTaskSchema.safeParse(body);

    if (!parseData.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: parseData.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const task = await prisma.task.create({
      data: {
        title: parseData.data.title,
        description: parseData.data.description,
        status: parseData.data.status ?? "PENDING",
        priority: parseData.data.priority ?? "MEDIUM",
        dueDate: parseData.data.dueDate
          ? new Date(parseData.data.dueDate)
          : null,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Task created successfully",
        task,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
