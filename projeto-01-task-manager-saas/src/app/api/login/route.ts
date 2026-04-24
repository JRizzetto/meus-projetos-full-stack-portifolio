import { NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Fluxo: Request → Validate → Find User → Compare Password → Response

// Validação de dados de email e password
const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    // Recebe o JSON enviado pelo frontend/Insomnia e transforma em json
    const body = await request.json();

    // Tenta validar os dados com o zod
    const parseData = loginSchema.safeParse(body);

    // Se der erro retorna erro com status 400
    if (!parseData.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          erros: parseData.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Desestruturação dos dados agora confiáveis
    const { email, password } = parseData.data;

    // Procura usuário pelo email.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Se não encontrar o email  returna o erro 401
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Compara a senha enviada pelo login do usuário com a senha do usuário cadastrada no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Se não encontrar a senha  returna o erro 401
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
