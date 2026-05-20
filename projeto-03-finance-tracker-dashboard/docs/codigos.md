4. Prisma Client Architecture + Auth Foundation

Adaptadores e bibliotecas para funcionar o prisma

- Instalar adaptador do Prisma para PostgreSQL: "@prisma/adapter-pg"
- Instalar Driver nativo PostgreSQL para Node.js: "npm install pg"
- Instalar Tipagens TypeScript para o driver pg: "npm install -D @types/pg"

1. Criar arquivo de cliente Prisma
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

2. Test Prisma Connection
   import { prisma } from "@/lib/prisma"
   import { NextResponse } from "next/server"

   export async function GET() {
   const users = await prisma.user.findMany()

   return NextResponse.json(users)
   }
