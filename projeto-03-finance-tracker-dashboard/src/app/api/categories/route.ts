import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/schemas/category-schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
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
    return NextResponse.json({ message: "user not found." }, { status: 404 });
  }

  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not Found" }, { status: 404 });
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        name: validatedData.name,
        userId: user.id,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists." },
        { status: 409 },
      );
    }

    const category = await prisma.category.create({
      data: {
        name: validatedData.name,
        type: validatedData.type,
        color: validatedData.color,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Category created successfully!",
        category,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE_CATEGORY_ERROR", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
