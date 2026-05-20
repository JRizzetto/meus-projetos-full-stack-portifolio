4. Prisma Client Architecture + Auth Foundation

Adaptadores e bibliotecas para funcionar o prisma

- Instalar adaptador do Prisma para PostgreSQL: "@prisma/adapter-pg"
- Instalar Driver nativo PostgreSQL para Node.js: "npm install pg"
- Instalar Tipagens TypeScript para o driver pg: "npm install -D @types/pg"

4.  Prisma Client Architecture + Auth Foundation
    - 4.1. Criar arquivo de cliente Prisma
      Arquivo src/lib/prisma.ts:

      import { PrismaClient } from "@/generated/prisma/client";
      import { PrismaPg } from "@prisma/adapter-pg";

      const globalForPrisma = global as unknown as {
      prisma: PrismaClient | undefined;
      };

      const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
      });

      export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

      if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma;
      }
      - 4.2. Test Prisma Connection
        import { prisma } from "@/lib/prisma"
        import { NextResponse } from "next/server"

      export async function GET() {
      const users = await prisma.user.findMany()

      return NextResponse.json(users)
      }

5.  Authentication Architecture (NextAuth)
    - Create Register Schema (ZOD)
      import { z } from "zod"

      export const registerSchema = z.object({
      name: z
      .string()
      .min(3, "Name must have at least 3 characters"),

      email: z
      .email("Invalid email address"),

      password: z
      .string()
      .min(6, "Password must have at least 6 characters"),
      })

6.  Register Backend
    - 6.1 - Inside: src/app/api/register/route.ts
      import { prisma } from "@/lib/prisma"
      import { registerSchema } from "@/schemas/register-schema"
      import { NextResponse } from "next/server"
      import bcrypt from "bcryptjs"

      export async function POST(request: Request) {
      try {
      const body = await request.json()

             const validatedData = registerSchema.parse(body)

             const existingUser = await prisma.user.findUnique({
                where: {
                email: validatedData.email,
                },
             })

             if (existingUser) {
                return NextResponse.json(
                { message: "User already exists." },
                { status: 409 }
                )
             }

             const hashedPassword = await bcrypt.hash(validatedData.password, 10)

             const user = await prisma.user.create({
                data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
                },
                select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                },
             })

             return NextResponse.json(
                {
                message: "User created successfully.",
                user,
                },
                { status: 201 }
             )

      } catch (error) {
      console.error("REGISTER_ERROR", error)

             return NextResponse.json(
                { message: "Internal server error." },
                { status: 500 }
             )

      }
      }

7.  NextAuth Configuration
    - 7.2. Configure auth.ts
      import { prisma } from "@/lib/prisma"
      import { PrismaAdapter } from "@auth/prisma-adapter"
      import { AuthOptions } from "next-auth"
      import CredentialsProvider from "next-auth/providers/credentials"
      import bcrypt from "bcryptjs"

    export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),

    session: {
    strategy: "jwt",
    },

    providers: [
    CredentialsProvider({
    name: "credentials",

          credentials: {
          email: {},
          password: {},
          },

          async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
             throw new Error("Invalid credentials.")
          }

          const user = await prisma.user.findUnique({
             where: {
                email: credentials.email,
             },
          })

          if (!user) {
             throw new Error("User not found.")
          }

          const passwordMatch = await bcrypt.compare(
             credentials.password,
             user.password
          )

          if (!passwordMatch) {
             throw new Error("Invalid password.")
          }

          return {
             id: user.id,
             name: user.name,
             email: user.email,
          }
          },

    }),
    ],

    pages: {
    signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
    }
    - 7.3. Configure NextAuth Route
      import NextAuth from "next-auth"
      import { authOptions } from "@/lib/auth"

    const handler = NextAuth(authOptions)

    export { handler as GET, handler as POST }
