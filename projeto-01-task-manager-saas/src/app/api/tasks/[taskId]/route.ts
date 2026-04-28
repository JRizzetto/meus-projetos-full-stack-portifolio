import { auth } from "@/auth"; // Verifica se o usuário está logado
import { prisma } from "@/lib/prisma"; // Para falar com o banco de dados
import { unpatchedSetImmediate } from "next/dist/server/node-environment-extensions/fast-set-immediate.external";
import { NextResponse } from "next/server"; // Para retornar respostas HTTP padronizadas
import { z } from "zod";

// No Next.js 15, params é assíncrono (precisa await)
// O ID da tarefa que vem da URL: /api/tasks/123
type RouteParams = {
  params: Promise<{
    taskId: string;
  }>;
};

export async function DELETE(request: Request, { params }: RouteParams) {
  // Verifica autenticação
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  //  Extrair o ID da tarefa
  const { taskId } = await params;

  try {
    // Buscar o usuário no banco
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    // Verificar se a tarefa existe e pertence ao usuário
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user.id,
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // Deletar a tarefa
    await prisma.task.delete({
      where: {
        id: task.id,
      },
    });

    // Retornar sucesso
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch {
    // Tratamento de erro
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = await params;

  try {
    const body = await request.json();

    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user.id,
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const updatetask = await prisma.task.update({
      where: { id: task.id },
      data: {
        status,
      },
    });

    return NextResponse.json(
      {
        message: "Task updated successfully",
        task: updatetask,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

const updateTaskSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.string().optional(),
});

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = await params;

  try {
    const body = await request.json();

    const parsedData = updateTaskSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: parsedData.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user.id,
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: task.id },
      data: {
        title: parsedData.data.title,
        description: parsedData.data.description,
        status: parsedData.data.status,
        priority: parsedData.data.priority,
        dueDate: parsedData.data.dueDate
          ? new Date(parsedData.data.dueDate)
          : null,
      },
    });

    return NextResponse.json(
      {
        message: "Task updated successfully",
        task: updatedTask,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
