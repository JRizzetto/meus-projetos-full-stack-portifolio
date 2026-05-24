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

8.  Login, Session Testing and Protected Route
    8.1. Create a Login Schema
    import { z } from "zod";

        export const loginSchema = z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
        });

        8.3. Create a Session Test Route
        Create: src/app/api/session-test/route.ts
        import { authOptions } from "@/lib/auth"
        import { getServerSession } from "next-auth"
        import { NextResponse } from "next/server"

        export async function GET() {
        const session = await getServerSession(authOptions)

        return NextResponse.json({
        session,
        })
        }

        8.4. Create a Protected API Route
        Create: src/app/api/protected-test/route.ts
            import { authOptions } from "@/lib/auth"
            import { getServerSession } from "next-auth"
            import { NextResponse } from "next/server"

            export async function GET() {
            const session = await getServerSession(authOptions)

            if (!session?.user) {
            return NextResponse.json(
            { message: "Unauthorized." },
            { status: 401 }
            )
            }

            return NextResponse.json({
            message: "You are authenticated.",
            user: session.user,
            })
            }

9.  Authentication UI Architecture
    9.3. Create RegisterForm Component
    Create: src/components/auth/RegisterForm.tsx  
     "use client"

    export function RegisterForm() {
    return (
     <div>
     <h1>Register Form</h1>
     </div>
     )
     }

    9.4. Render RegisterForm in Page
    Inside: src/app/register/page.tsx
    import { RegisterForm } from "@/components/auth/RegisterForm"

    export default function RegisterPage() {
    return (
      <main>
      <RegisterForm />
      </main>
      )
      }

    9.5. Create LoginForm Component
    Create: src/components/auth/LoginForm.tsx (arquivo com código no codigos.md)
    "use client"

    export function LoginForm() {
    return (
       <div>
       <h1>Login Form</h1>
       </div>
       )
       }

    9.6. Render LoginForm in Page
    Inside: src/app/login/page.tsx
    import { LoginForm } from "@/components/auth/LoginForm"

    export default function LoginPage() {
    return (
      <main>
      <LoginForm />
      </main>
      )
      }

10. Real Register Form + API Integration
    Open: src/components/auth/RegisterForm.tsx
    Replace everything with: (code in codigos.md)
    "use client"

    import { useState } from "react"
    import { useRouter } from "next/navigation"
    import toast from "react-hot-toast"

    export function RegisterForm() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

               try {
                  const response = await fetch("/api/register", {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     name,
                     email,
                     password,
                  }),
                  })

                  const data = await response.json()

                  if (!response.ok) {
                  toast.error(data.message || "Something went wrong.")
                  return
                  }

                  toast.success("Account created successfully.")
                  router.push("/login")
               } catch (error) {
                  console.error("REGISTER_FORM_ERROR", error)
                  toast.error("Unexpected error. Please try again.")
               } finally {
                  setIsLoading(false)
               }

    }

    return (

         <form onSubmit={handleSubmit} className="mx-auto mt-20 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-white shadow-xl">
         <div>
         <h1 className="text-2xl font-semibold">Create your account</h1>
         <p className="mt-2 text-sm text-zinc-400">
         Start tracking your finances with a modern dashboard.
         </p>
         </div>

                  <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />

                  <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />

                  <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />

                  <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                  {isLoading ? "Creating account..." : "Create account"}
                  </button>
               </form>

    )
    }

11. Real Login Flow + Session Authentication
    - 11.2. Create Providers Component
      Create: src/components/providers.tsx (code in codigos.md)
      "use client"

    import { SessionProvider } from "next-auth/react"

    interface ProvidersProps {
    children: React.ReactNode
    }

    export function Providers({ children }: ProvidersProps) {
    return (
    <SessionProvider>
    {children}
    </SessionProvider>
    )
    }
    - 11.4. Build Real Login Form
      "use client"

    import { signIn } from "next-auth/react"
    import { useRouter } from "next/navigation"
    import { useState } from "react"
    import toast from "react-hot-toast"

    export function LoginForm() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

            setIsLoading(true)

            try {
               const response = await signIn("credentials", {
               email,
               password,
               redirect: false,
               })

               if (response?.error) {
               toast.error("Invalid email or password.")
               return
               }

               toast.success("Login successful.")

               router.push("/dashboard")
            } catch (error) {
               console.error("LOGIN_ERROR", error)

               toast.error("Something went wrong.")
            } finally {
               setIsLoading(false)
            }

    }

    return (
      <form
               onSubmit={handleSubmit}
               className="mx-auto mt-20 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-white shadow-xl"
            >
      <div>
      <h1 className="text-2xl font-semibold">
      Welcome back
      </h1>

               <p className="mt-2 text-sm text-zinc-400">
                  Login to continue managing your finances.
               </p>
               </div>

               <input
               type="email"
               placeholder="Email address"
               value={email}
               onChange={(event) => setEmail(event.target.value)}
               className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
               />

               <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
               />

               <button
               type="submit"
               disabled={isLoading}
               className="rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
               >
               {isLoading ? "Signing in..." : "Sign in"}
               </button>
            </form>

    )
    }

12. Protected Dashboard + Route Protection
    12.2. Protect the Dashboard Route (code in codigos.md)
    import { authOptions } from "@/lib/auth"
    import { getServerSession } from "next-auth"
    import { redirect } from "next/navigation"

    export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
    redirect("/login")
    }

    return (
      <main>
      <h1>Welcome to your dashboard</h1>

               <p>{session.user.email}</p>
            </main>

    )
    }

13. Dashboard Layout Architecture
    Create: src/app/dashboard/layout.tsx (code in codigos.md)
    import { authOptions } from "@/lib/auth"
    import { getServerSession } from "next-auth"
    import { redirect } from "next/navigation"

    interface DashboardLayoutProps {
    children: React.ReactNode
    }

    export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
    redirect("/login")
    }

    return (
    <div className="min-h-screen bg-zinc-950 text-white">
    <div className="flex min-h-screen">
    <aside className="hidden w-72 border-r border-zinc-800 bg-zinc-950 p-6 lg:block">
    <h2 className="text-xl font-semibold">FinanceOS</h2>

               <nav className="mt-8 flex flex-col gap-3 text-sm text-zinc-400">
                  <a href="/dashboard" className="rounded-lg px-3 py-2 text-white bg-zinc-900">
                  Overview
                  </a>
                  <a href="/dashboard/transactions" className="rounded-lg px-3 py-2 hover:bg-zinc-900">
                  Transactions
                  </a>
                  <a href="/dashboard/categories" className="rounded-lg px-3 py-2 hover:bg-zinc-900">
                  Categories
                  </a>
               </nav>
            </aside>

            <main className="flex-1 p-6 lg:p-10">
               {children}
            </main>
            </div>
         </div>

    )
    }
