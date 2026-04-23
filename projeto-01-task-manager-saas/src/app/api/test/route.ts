import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name: "Jefferson",
        email: "jefferson@email.com",
        password: "123456",
      },
    });

    // Buscar usuários
    const users = await prisma.user.findMany();

    return Response.json({
      message: "Success",
      createdUser: user,
      allUsers: users,
    });
  } catch (error) {
    return Response.json({
      error: "Something went wrong",
      details: error,
    });
  }
}
