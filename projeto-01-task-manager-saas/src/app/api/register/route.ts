import { NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

// Define as regras de validação dos dados recebidos
const registerSchema = z.object({
  name: z.string().min(2, "name must have at least 2 characters"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 charactres"),
});

export async function POST(request: Request) {
  try {
    // 1. Recebe os dados do frontend e converte para JSON
    const body = await request.json();

    // 2. Valida os dados recebidos usando o schema do Zod
    const parsedData = registerSchema.safeParse(body);

    // 3. Se algum campo não passar na validação, retorna erro 400 (Bad Request)
    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: parsedData.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // 4. Extrai os dados já validados do objeto parsedData, faz uma desestruturação.
    const { name, email, password } = parsedData.data;

    // 5. Verifica se o email já está cadastrado no banco de dados
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // 6. Se o email já existe, retorna erro 409 (Conflict)
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 },
      );
    }

    // 7. Criptografa a senha recebida para segurança (nunca guardar texto puro)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8. Salva o novo usuário no banco de dados com a senha criptografada
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 9. Retorna sucesso com os dados do usuário (sem a senha!)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    // 10. Se qualquer erro inesperado acontecer, retorna erro 500
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
