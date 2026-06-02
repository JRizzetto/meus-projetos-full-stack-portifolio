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
    - import { authOptions } from "@/lib/auth"
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
    - export default function DashboardPage() {
      return (
         <section>
            <h1 className="text-3xl font-semibold">Financial Overview</h1>
            <p className="mt-2 text-zinc-400">
            Track your income, expenses and financial growth.
            </p>
         </section>
      )
      }

14. SaaS Dashboard Shell
    - 14.2. Create DashboardSidebar Component
      Create: src/components/dashboard/DashboardSidebar.tsx
      export function DashboardSidebar() {
      return (
      <aside className="hidden w-72 border-r border-zinc-800 bg-zinc-950 p-6 lg:block">
      <h2 className="text-2xl font-bold tracking-tight text-white">
      FinanceOS
      </h2>

                   <nav className="mt-10 flex flex-col gap-3 text-sm">
                   <a
                      href="/dashboard"
                      className="rounded-lg bg-zinc-900 px-4 py-3 text-white transition hover:bg-zinc-800"
                   >
                      Overview
                   </a>

                   <a
                      href="/dashboard/transactions"
                      className="rounded-lg px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                   >
                      Transactions
                   </a>

                   <a
                      href="/dashboard/categories"
                      className="rounded-lg px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                   >
                      Categories
                   </a>
                   </nav>
                </aside>

      )
      }

    - 14.3. Create DashboardTopbar Component
      Create: src/components/dashboard/DashboardTopbar.tsx (code in codigos.md)
      import { UserMenu } from "./UserMenu"

      interface DashboardTopbarProps {
      userName?: string | null
      userEmail?: string | null
      }

      export function DashboardTopbar({
      userName,
      userEmail,
      }: DashboardTopbarProps) {
      return (
      <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
      <div>
      <h1 className="text-2xl font-semibold text-white">
      Financial Dashboard
      </h1>

              <p className="mt-1 text-sm text-zinc-400">
                 Monitor your financial performance and analytics.
              </p>
              </div>

              <UserMenu
              userName={userName}
              userEmail={userEmail}
              />
           </header>

      )
      }
      - 14.4. Create UserMenu Component
        Create: src/components/dashboard/UserMenu.tsx
        "use client"

      import { signOut } from "next-auth/react"

      interface UserMenuProps {
      userName?: string | null
      userEmail?: string | null
      }

      export function UserMenu({
      userName,
      userEmail,
      }: UserMenuProps) {
      return (

         <div className="flex items-center gap-4">
         <div className="text-right">
         <p className="text-sm font-medium text-white">
         {userName}
         </p>

                  <p className="text-xs text-zinc-400">
                     {userEmail}
                  </p>
                  </div>

                  <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                  >
                  Logout
                  </button>
               </div>

      )
      }
      - 14.5. Update Dashboard Layout
        Now replace your: src/app/dashboard/layout.tsx
        import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
        import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar"
        import { authOptions } from "@/lib/auth"
        import { getServerSession } from "next-auth"
        import { redirect } from "next/navigation"

        interface DashboardLayoutProps {
        children: React.ReactNode
        }

        export default async function DashboardLayout({
        children,
        }: DashboardLayoutProps) {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
        redirect("/login")
        }

        return (
        <div className="min-h-screen bg-zinc-950 text-white">
        <div className="flex min-h-screen">
        <DashboardSidebar />

               <main className="flex-1 p-6 lg:p-10">
                  <DashboardTopbar
                     userName={session.user.name}
                     userEmail={session.user.email}
                  />

                  <div className="mt-10">
                     {children}
                  </div>
               </main>
               </div>
            </div>

        )
        }

15. Financial Summary Cards Architecture
    - 15.2. Create SummaryCard Component
      Create: src/components/dashboard/summary/SummaryCard.tsx (code in codigos.md)
      interface SummaryCardProps {
      title: string
      value: string
      description: string
      }

    export function SummaryCard({
    title,
    value,
    description,
    }: SummaryCardProps) {
    return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
    <div className="flex items-start justify-between">
    <div>
    <p className="text-sm text-zinc-400">
    {title}
    </p>

               <h2 className="mt-4 text-3xl font-bold text-white">
                  {value}
               </h2>

               <p className="mt-2 text-sm text-zinc-500">
                  {description}
               </p>
            </div>
            </div>
         </div>

    )
    }
    - 15.3. Create SummaryCards Component
      Create: src/components/dashboard/summary/SummaryCards.tsx (code in codigos.md)
      import { SummaryCard } from "./SummaryCard"

      export function SummaryCards() {
      return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
               title="Total Balance"
               value="$12,450.00"
               description="Current available balance"
               />

               <SummaryCard
               title="Monthly Income"
               value="$8,200.00"
               description="Income this month"
               />

               <SummaryCard
               title="Monthly Expenses"
               value="$3,750.00"
               description="Expenses this month"
               />

               <SummaryCard
               title="Savings Rate"
               value="42%"
               description="Monthly savings performance"
               />
            </section>

      )
      }
      - 15.4. Update Dashboard Page
        Open: src/app/dashboard/page.tsx (code in codigos.md)
        import { SummaryCards } from "@/components/dashboard/summary/SummaryCards"

        export default function DashboardPage() {
        return (
         <section className="space-y-10">
         <div>
         <h1 className="text-3xl font-semibold text-white">
         Financial Overview
         </h1>

               <p className="mt-2 text-zinc-400">
                  Monitor your financial health and monthly performance.
               </p>
               </div>

               <SummaryCards />
            </section>

        )
        }

16. Real Financial Data Architecture
    - 16.1. Create transaction schema
      Create: src/schemas/transaction-schema.ts  
      import { z } from "zod"

      export const transactionSchema = z.object({
      title: z.string().min(2, "Title must have at least 2 characters"),
      amount: z.number().positive("Amount must be greater than zero"),
      type: z.enum(["INCOME", "EXPENSE"]),
      date: z.string().min(1, "Date is required"),
      description: z.string().optional(),
      categoryId: z.string().min(1, "Category is required"),
      })

    - 16.2. Create transactions API route
      src/app/api/transactions/route.ts
      import { authOptions } from "@/lib/auth"
      import { prisma } from "@/lib/prisma"
      import { transactionSchema } from "@/schemas/transaction-schema"
      import { getServerSession } from "next-auth"
      import { NextResponse } from "next/server"

      export async function GET() {
      const session = await getServerSession(authOptions)

      if (!session?.user?.email) {
      return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
      )
      }

      const user = await prisma.user.findUnique({
      where: {
      email: session.user.email,
      },
      })

      if (!user) {
      return NextResponse.json(
      { message: "User not found." },
      { status: 404 }
      )
      }

      const transactions = await prisma.transaction.findMany({
      where: {
      userId: user.id,
      },
      include: {
      category: true,
      },
      orderBy: {
      date: "desc",
      },
      })

      return NextResponse.json(transactions)
      }

      export async function POST(request: Request) {
      const session = await getServerSession(authOptions)

      if (!session?.user?.email) {
      return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
      )
      }

      try {
      const body = await request.json()
      const validatedData = transactionSchema.parse(body)

      const user = await prisma.user.findUnique({
      where: {
      email: session.user.email,
      },
      })

      if (!user) {
      return NextResponse.json(
      { message: "User not found." },
      { status: 404 }
      )
      }

      const category = await prisma.category.findFirst({
      where: {
      id: validatedData.categoryId,
      userId: user.id,
      },
      })

      if (!category) {
      return NextResponse.json(
      { message: "Category not found." },
      { status: 404 }
      )
      }

      const transaction = await prisma.transaction.create({
      data: {
      title: validatedData.title,
      amount: validatedData.amount,
      type: validatedData.type,
      date: new Date(validatedData.date),
      description: validatedData.description,
      userId: user.id,
      categoryId: validatedData.categoryId,
      },
      include: {
      category: true,
      },
      })

      return NextResponse.json(
      {
      message: "Transaction created successfully.",
      transaction,
      },
      { status: 201 }
      )
      } catch (error) {
      console.error("CREATE_TRANSACTION_ERROR", error)

      return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
      )
      }
      }

17. Category API Architecture
    - 17.1. Create Category Schema
      Create: src/schemas/category-schema.ts
      import { z } from "zod"

      export const categorySchema = z.object({
      name: z
      .string()
      .min(2, "Category name must have at least 2 characters"),

      type: z.enum(["INCOME", "EXPENSE"]),

      color: z
      .string()
      .min(4, "Color is required"),
      })

    - 17.2. Create Categories API Route
      Create: src/app/api/categories/route.ts
      import { authOptions } from "@/lib/auth"
      import { prisma } from "@/lib/prisma"
      import { categorySchema } from "@/schemas/category-schema"
      import { getServerSession } from "next-auth"
      import { NextResponse } from "next/server"

      export async function GET() {
      const session = await getServerSession(authOptions)

      if (!session?.user?.email) {
      return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
      )
      }

      const user = await prisma.user.findUnique({
      where: {
      email: session.user.email,
      },
      })

      if (!user) {
      return NextResponse.json(
      { message: "User not found." },
      { status: 404 }
      )
      }

      const categories = await prisma.category.findMany({
      where: {
      userId: user.id,
      },
      orderBy: {
      createdAt: "desc",
      },
      })

      return NextResponse.json(categories)
      }

      export async function POST(request: Request) {
      const session = await getServerSession(authOptions)

      if (!session?.user?.email) {
      return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
      )
      }

      try {
      const body = await request.json()

            const validatedData = categorySchema.parse(body)

            const user = await prisma.user.findUnique({
               where: {
               email: session.user.email,
               },
            })

            if (!user) {
               return NextResponse.json(
               { message: "User not found." },
               { status: 404 }
               )
            }

            const existingCategory = await prisma.category.findFirst({
               where: {
               name: validatedData.name,
               userId: user.id,
               },
            })

            if (existingCategory) {
               return NextResponse.json(
               { message: "Category already exists." },
               { status: 409 }
               )
            }

            const category = await prisma.category.create({
               data: {
               name: validatedData.name,
               type: validatedData.type,
               color: validatedData.color,
               userId: user.id,
               },
            })

            return NextResponse.json(
               {
               message: "Category created successfully.",
               category,
               },
               { status: 201 }
            )

      } catch (error) {
      console.error("CREATE_CATEGORY_ERROR", error)

            return NextResponse.json(
               { message: "Internal server error." },
               { status: 500 }
            )

      }
      }

18. Category UI + Authenticated API Integration
    - 18.1. Create Category Form
      Create: src/components/dashboard/categories/CategoryForm.tsx
      "use client"

      import { useState } from "react"
      import toast from "react-hot-toast"

      export function CategoryForm() {
      const [name, setName] = useState("")
      const [type, setType] = useState("EXPENSE")
      const [color, setColor] = useState("#ef4444")
      const [isLoading, setIsLoading] = useState(false)

      async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      setIsLoading(true)

           try {
              const response = await fetch("/api/categories", {
              method: "POST",
              headers: {
                 "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, type, color }),
              })

              const data = await response.json()

              if (!response.ok) {
              toast.error(data.message || "Something went wrong.")
              return
              }

              toast.success("Category created successfully.")
              setName("")
           } catch (error) {
              console.error("CREATE_CATEGORY_FORM_ERROR", error)
              toast.error("Unexpected error.")
           } finally {
              setIsLoading(false)
           }

      }

      return (
      <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
           >
      <h2 className="text-xl font-semibold text-white">Create category</h2>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
              <input
                 value={name}
                 onChange={(event) => setName(event.target.value)}
                 placeholder="Category name"
                 className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
              />

              <select
                 value={type}
                 onChange={(event) => setType(event.target.value)}
                 className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
              >
                 <option value="INCOME">Income</option>
                 <option value="EXPENSE">Expense</option>
              </select>

              <input
                 type="color"
                 value={color}
                 onChange={(event) => setColor(event.target.value)}
                 className="h-12 rounded-lg border border-zinc-800 bg-zinc-950 px-2"
              />

              <button
                 disabled={isLoading}
                 className="rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-400 disabled:opacity-70"
              >
                 {isLoading ? "Creating..." : "Create category"}
              </button>
              </div>
           </form>

      )
      }

    - 18.2. Create Categories Page
      Create: src/app/dashboard/categories/page.tsx
      import { CategoryForm } from "@/components/dashboard/categories/CategoryForm"

      export default function CategoriesPage() {
      return (
      <section className="space-y-8">
      <div>
      <h1 className="text-3xl font-semibold text-white">Categories</h1>
      <p className="mt-2 text-zinc-400">
      Organize your income and expenses for better analytics.
      </p>
      </div>

              <CategoryForm />
           </section>

      )
      }

19. Real Transaction Form Architecture
    - 19.2. Build TransactionForm
      Create: src/components/dashboard/transactions/TransactionForm.tsx
      "use client"

    import { useEffect, useState } from "react"
    import toast from "react-hot-toast"

    interface Category {
    id: string
    name: string
    type: "INCOME" | "EXPENSE"
    color: string
    }

    export function TransactionForm() {
    const [categories, setCategories] = useState<Category[]>([])

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("EXPENSE")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
    async function loadCategories() {
    try {
    const response = await fetch("/api/categories")
    const data = await response.json()

            setCategories(data)
            } catch (error) {
            console.error("LOAD_CATEGORIES_ERROR", error)
            }
         }

         loadCategories()

    }, [])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

         setIsLoading(true)

         try {
            const response = await fetch("/api/transactions", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               title,
               amount: Number(amount),
               type,
               date,
               description,
               categoryId,
            }),
            })

            const data = await response.json()

            if (!response.ok) {
            toast.error(data.message || "Something went wrong.")
            return
            }

            toast.success("Transaction created successfully.")

            setTitle("")
            setAmount("")
            setDate("")
            setDescription("")
            setCategoryId("")
         } catch (error) {
            console.error("CREATE_TRANSACTION_ERROR", error)

            toast.error("Unexpected error.")
         } finally {
            setIsLoading(false)
         }

    }

    return (
    <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
         >
    <h2 className="text-xl font-semibold text-white">
    Create transaction
    </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
               value={title}
               onChange={(event) => setTitle(event.target.value)}
               placeholder="Transaction title"
               className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
            />

            <input
               type="number"
               value={amount}
               onChange={(event) => setAmount(event.target.value)}
               placeholder="Amount"
               className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
            />

            <select
               value={type}
               onChange={(event) => setType(event.target.value)}
               className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
            >
               <option value="INCOME">Income</option>
               <option value="EXPENSE">Expense</option>
            </select>

            <input
               type="date"
               value={date}
               onChange={(event) => setDate(event.target.value)}
               className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
            />

            <select
               value={categoryId}
               onChange={(event) => setCategoryId(event.target.value)}
               className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
            >
               <option value="">Select category</option>

               {categories
                  .filter((category) => category.type === type)
                  .map((category) => (
                  <option key={category.id} value={category.id}>
                     {category.name}
                  </option>
                  ))}
            </select>

            <input
               value={description}
               onChange={(event) => setDescription(event.target.value)}
               placeholder="Description (optional)"
               className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
            />
            </div>

            <button
            disabled={isLoading}
            className="mt-6 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-400 disabled:opacity-70"
            >
            {isLoading ? "Creating..." : "Create transaction"}
            </button>
         </form>

    )
    }
    - 19.3. Create Transactions Page
      Create: src/app/dashboard/transactions/page.tsx
      import { TransactionForm } from "@/components/dashboard/transactions/TransactionForm"

      export default function TransactionsPage() {
      return (
      <section className="space-y-8">
      <div>
      <h1 className="text-3xl font-semibold text-white">
      Transactions
      </h1>

              <p className="mt-2 text-zinc-400">
                 Register your income and expenses.
              </p>
              </div>

              <TransactionForm />
           </section>

      )
      }

20. Financial Analytics Architecture
    - 20.1. Create Dashboard Metrics API
      Create: src/app/api/dashboard/route.ts
      import { authOptions } from "@/lib/auth"
      import { prisma } from "@/lib/prisma"
      import { getServerSession } from "next-auth"
      import { NextResponse } from "next/server"

    export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
    return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
    )
    }

    const user = await prisma.user.findUnique({
    where: {
    email: session.user.email,
    },
    })

    if (!user) {
    return NextResponse.json(
    { message: "User not found" },
    { status: 404 }
    )
    }

    const transactions = await prisma.transaction.findMany({
    where: {
    userId: user.id,
    },
    })

    const totalIncome = transactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((acc, transaction) => acc + transaction.amount, 0)

    const totalExpenses = transactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((acc, transaction) => acc + transaction.amount, 0)

    const totalBalance = totalIncome - totalExpenses

    const savingsRate =
    totalIncome > 0
    ? Number(
    ((totalBalance / totalIncome) \* 100).toFixed(1)
    )
    : 0

    return NextResponse.json({
    totalIncome,
    totalExpenses,
    totalBalance,
    savingsRate,
    })
    }
    - 20.2. Create Dashboard Metrics Hook
      Create: src/hooks/useDashboardMetrics.ts
      "use client"

    import { useEffect, useState } from "react"

    interface DashboardMetrics {
    totalIncome: number
    totalExpenses: number
    totalBalance: number
    savingsRate: number
    }

    export function useDashboardMetrics() {
    const [metrics, setMetrics] =
    useState<DashboardMetrics | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
    async function loadMetrics() {
    try {
    const response = await fetch("/api/dashboard")
    const data = await response.json()

            setMetrics(data)
            } catch (error) {
            console.error("LOAD_METRICS_ERROR", error)
            } finally {
            setIsLoading(false)
            }
         }

         loadMetrics()

    }, [])

    return {
    metrics,
    isLoading,
    }
    }
    - 20.3. Refactor SummaryCards
      Open: src/components/dashboard/summary/SummaryCards.tsx
      "use client"

      import { useDashboardMetrics } from "@/hooks/useDashboardMetrics"
      import { SummaryCard } from "./SummaryCard"

      export function SummaryCards() {
      const { metrics, isLoading } =
      useDashboardMetrics()

      if (isLoading) {
      return <p>Loading metrics...</p>
      }

      if (!metrics) {
      return <p>Unable to load metrics.</p>
      }

      return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
      title="Total Balance"
      value={`$${metrics.totalBalance.toFixed(2)}`}
      description="Current available balance"
      />

              <SummaryCard
              title="Total Income"
              value={`$${metrics.totalIncome.toFixed(2)}`}
              description="All registered income"
              />

              <SummaryCard
              title="Total Expenses"
              value={`$${metrics.totalExpenses.toFixed(2)}`}
              description="All registered expenses"
              />

              <SummaryCard
              title="Savings Rate"
              value={`${metrics.savingsRate}%`}
              description="Savings performance"
              />
           </section>

      )
      }

21. Recent Transactions Widget + Dashboard Composition
    - 21.1. Create Recent Transactions Component
      Create: src/components/dashboard/transactions/RecentTransactions.tsx
      "use client"

      import { useEffect, useState } from "react"

      interface Transaction {
      id: string
      title: string
      amount: number
      type: "INCOME" | "EXPENSE"
      date: string
      }

      export function RecentTransactions() {
      const [transactions, setTransactions] = useState<Transaction[]>([])

      useEffect(() => {
      async function loadTransactions() {
      try {
      const response = await fetch("/api/transactions")
      const data = await response.json()

                setTransactions(data.slice(0, 5))
                } catch (error) {
                console.error("LOAD_TRANSACTIONS_ERROR", error)
                }
             }

             loadTransactions()

      }, [])

      return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">
        Recent Transactions
        </h2>

                <div className="mt-6 space-y-4">
                {transactions.length === 0 ? (
                   <p className="text-zinc-400">
                      No transactions found.
                   </p>
                ) : (
                   transactions.map((transaction) => (
                      <div
                      key={transaction.id}
                      className="flex items-center justify-between border-b border-zinc-800 pb-3"
                      >
                      <div>
                         <p className="font-medium text-white">
                            {transaction.title}
                         </p>

                         <p className="text-sm text-zinc-400">
                            {new Date(
                            transaction.date
                            ).toLocaleDateString()}
                         </p>
                      </div>

                      <span
                         className={
                            transaction.type === "INCOME"
                            ? "font-medium text-emerald-400"
                            : "font-medium text-red-400"
                         }
                      >
                         {transaction.type === "INCOME" ? "+" : "-"}$
                         {Number(transaction.amount).toFixed(2)}
                      </span>
                      </div>
                   ))
                )}
                </div>
             </div>

      )
      }
      - 21.2. Update Dashboard Page
        Open: src/app/dashboard/page.tsx
        Add: import { RecentTransactions } from "@/components/dashboard/transactions/RecentTransactions"
        import { SummaryCards } from "@/components/dashboard/summary/SummaryCards"
        import { RecentTransactions } from "@/components/dashboard/transactions/RecentTransactions"

        export default function DashboardPage() {
        return (
        <section className="space-y-10">
        <div>
        <h1 className="text-3xl font-semibold text-white">
        Financial Overview
        </h1>

               <p className="mt-2 text-zinc-400">
                  Monitor your financial health and monthly performance.
               </p>
               </div>

               <SummaryCards />

               <RecentTransactions />
            </section>

        )
        }

22. Monthly Expense Chart with Recharts
    - 22.2. Create Dashboard Analytics API
      Create: src/app/api/dashboard/analytics/route.ts
      import { authOptions } from "@/lib/auth"
      import { prisma } from "@/lib/prisma"
      import { getServerSession } from "next-auth"
      import { NextResponse } from "next/server"

      export async function GET() {
      const session = await getServerSession(authOptions)

      if (!session?.user?.email) {
      return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
      )
      }

      const user = await prisma.user.findUnique({
      where: {
      email: session.user.email,
      },
      })

      if (!user) {
      return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
      )
      }

      const expenses = await prisma.transaction.findMany({
      where: {
      userId: user.id,
      type: "EXPENSE",
      },
      orderBy: {
      date: "asc",
      },
      })

      const monthlyData = expenses.reduce<
      Record<string, number>

      > ((acc, transaction) => {

          const month = new Date(transaction.date)
            .toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })

          acc[month] =
            (acc[month] || 0) +
            transaction.amount.toNumber()

          return acc

      }, {})

      const chartData = Object.entries(monthlyData).map(
      ([month, amount]) => ({
      month,
      amount,
      })
      )

      return NextResponse.json(chartData)
      }
      - 22.3. Create Chart Component
        Open: src/components/dashboard/charts/MonthlyExpensesChart.tsx
        "use client"

        import { useEffect, useState } from "react"
        import {
        ResponsiveContainer,
        BarChart,
        Bar,
        XAxis,
        YAxis,
        Tooltip,
        } from "recharts"

        interface ChartData {
        month: string
        amount: number
        }

        export function MonthlyExpensesChart() {
        const [data, setData] = useState<ChartData[]>([])

        useEffect(() => {
        async function loadData() {
        const response = await fetch(
        "/api/dashboard/analytics"
        )

               const result = await response.json()

               setData(result)
            }

            loadData()

        }, [])

        return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">
        Monthly Expenses
        </h2>

               <div className="mt-6 h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                     <XAxis dataKey="month" />
                     <YAxis />
                     <Tooltip />
                     <Bar dataKey="amount" />
                  </BarChart>
               </ResponsiveContainer>
               </div>
            </div>

        )
        }

23. Category Distribution Pie Chart
    - 23.1. Create Analytics API
      Create: src/app/api/dashboard/category-distribution/route.ts - import { authOptions } from "@/lib/auth"
      import { prisma } from "@/lib/prisma"
      import { getServerSession } from "next-auth"
      import { NextResponse } from "next/server"

            export async function GET() {
            const session = await getServerSession(authOptions)

            if (!session?.user?.email) {
            return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
            )
            }

            const user = await prisma.user.findUnique({
            where: {
            email: session.user.email,
            },
            })

            if (!user) {
            return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
            )
            }

            const expenses = await prisma.transaction.findMany({
            where: {
            userId: user.id,
            type: "EXPENSE",
            },
            include: {
            category: true,
            },
            })

            const groupedData = expenses.reduce<
            Record<string, { amount: number; color: string }>

            > ((acc, transaction) => {
            > const categoryName = transaction.category.name

            if (!acc[categoryName]) {
            acc[categoryName] = {
            amount: 0,
            color: transaction.category.color,
            }
            }

            acc[categoryName].amount +=
            transaction.amount.toNumber()

            return acc
            }, {})

            const chartData = Object.entries(groupedData).map(
            ([name, value]) => ({
            name,
            amount: value.amount,
            color: value.color,
            })
            )

            return NextResponse.json(chartData)
            }

      - 23.2. Create Pie Chart Component
        Create: src/components/dashboard/charts/CategoryDistributionChart.tsx
        "use client"

               import { useEffect, useState } from "react"
               import {
               PieChart,
               Pie,
               Cell,
               ResponsiveContainer,
               Tooltip,
               } from "recharts"

               interface CategoryData {
               name: string
               amount: number
               color: string
               }

               export function CategoryDistributionChart() {
               const [data, setData] = useState<CategoryData[]>([])

               useEffect(() => {
                  async function loadData() {
                     const response = await fetch(
                     "/api/dashboard/category-distribution"
                     )

                     const result = await response.json()

                     setData(result)
                  }

                  loadData()
               }, [])

               if (!data.length) {
                  return (
                     <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                     <h2 className="text-xl font-semibold text-white">
                        Expense Categories
                     </h2>

                     <p className="mt-4 text-zinc-400">
                        No expense data available.
                     </p>
                     </div>
                  )
               }

               return (
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20">
                     <div className="mb-6">
                     <h2 className="text-xl font-semibold text-white">
                        Expense Categories
                     </h2>

                     <p className="mt-1 text-sm text-zinc-400">
                        Distribution of expenses by category.
                     </p>
                     </div>

                     <div className="h-[350px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                           data={data}
                           dataKey="amount"
                           nameKey="name"
                           outerRadius={120}
                           >
                           {data.map((entry) => (
                              <Cell
                                 key={entry.name}
                                 fill={entry.color}
                              />
                           ))}
                           </Pie>

                           <Tooltip
                           formatter={(value) => [
                              `$${value}`,
                              "Amount",
                           ]}
                           contentStyle={{
                              backgroundColor: "#18181b",
                              border: "1px solid #27272a",
                              borderRadius: "12px",
                              color: "#fff",
                           }}
                           />
                        </PieChart>
                     </ResponsiveContainer>
                     </div>
                  </div>
               )

        }

24. -

25. Transaction Filters UI + Transactions Page
    - 25.2 — Create Transactions Table Component
      Create: src/components/transactions
      inside: TransactionsTable.tsx
      "use client"

      export function TransactionsTable() {
      return (
         <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
            Transactions Table
         </div>
      )
      }

    - 25.3 — Create Search Filter Component
      Create: src/components/transactions/TransactionFilters.tsx
      "use client"

      export function TransactionFilters() {
      return (
         <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
            Filters
         </div>
      )
      }

26. Real Transactions Table
    - 26.1 — Create Transaction Type
      Inside: src/types
      Create: transaction.ts
      export interface Transaction {
      id: string
      title: string
      amount: number
      type: "INCOME" | "EXPENSE"
      date: string

      category: {
      id: string
      name: string
      color: string
      }
      }

    - 26.2 — Build TransactionsTable
      Open: src/components/transactions/TransactionsTable.tsx
      "use client"

      import { useEffect, useState } from "react"
      import { Transaction } from "@/types/transaction"

      export function TransactionsTable() {
      const [transactions, setTransactions] = useState<Transaction[]>([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
      async function loadTransactions() {
      try {
      const response = await fetch("/api/transactions")

            const data = await response.json()

            setTransactions(data)
            } catch (error) {
            console.error(error)
            } finally {
            setLoading(false)
            }

      }

      loadTransactions()
      }, [])

      if (loading) {
      return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      Loading transactions...
      </div>
      )
      }

      if (!transactions.length) {
      return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      No transactions found.
      </div>
      )
      }

      return (
         <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50">
            <table className="w-full">
            <thead>
               <tr className="border-b border-zinc-800">
                  <th className="p-4 text-left text-zinc-400">
                  Title
                  </th>

                  <th className="p-4 text-left text-zinc-400">
                  Category
                  </th>

                  <th className="p-4 text-left text-zinc-400">
                  Type
                  </th>

                  <th className="p-4 text-left text-zinc-400">
                  Amount
                  </th>

                  <th className="p-4 text-left text-zinc-400">
                  Date
                  </th>
               </tr>
            </thead>

            <tbody>
               {transactions.map((transaction) => (
                  <tr
                  key={transaction.id}
                  className="border-b border-zinc-800"
                  >
                  <td className="p-4 text-white">
                     {transaction.title}
                  </td>

                  <td className="p-4">
                     <span
                        className="inline-flex items-center gap-2"
                     >
                        <span
                        className="h-3 w-3 rounded-full"
                        style={{
                           backgroundColor:
                              transaction.category.color,
                        }}
                        />

                        <span className="text-zinc-300">
                        {transaction.category.name}
                        </span>
                     </span>
                  </td>

                  <td className="p-4 text-zinc-300">
                     {transaction.type}
                  </td>

                  <td className="p-4 text-white">
                     ${transaction.amount}
                  </td>

                  <td className="p-4 text-zinc-300">
                     {new Date(
                        transaction.date
                     ).toLocaleDateString()}
                  </td>
                  </tr>
               ))}
            </tbody>
            </table>

         </div>
      )
      }

27. Connect Filters to the Transactions Table
    Product Goal When the user changes: Search, Transaction Type, Category - the table should automatically display the filtered results.
    - 27.1 — Lift State Up
      Open: src/app/dashboard/transactions/page.tsx
      Convert it to a Client Component:
      "use client"
      const [search, setSearch] = useState("")
      const [type, setType] = useState("")
      const [categoryId, setCategoryId] = useState("")
    - 27.2 — Pass State to Filters
      Future structure:
      <TransactionFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />

    - 27.3 — Pass Filters to Table
      <TransactionsTable
        search={search}
        type={type}
        categoryId={categoryId}
      />

    - 27.4 — Update TransactionsTable Props
      Create interface:
      interface TransactionsTableProps {
      search: string
      type: string
      categoryId: string
      }

      Update component:
      export function TransactionsTable({
      search,
      type,
      categoryId,
      }: TransactionsTableProps)

    - 27.5 — Dynamic Fetch URL
      Replace: fetch("/api/transactions")
      with:
      const params = new URLSearchParams()

      if (search) {
      params.append("search", search)
      }

      if (type) {
      params.append("type", type)
      }

      if (categoryId) {
      params.append("categoryId", categoryId)
      }

      const response = await fetch(
      `/api/transactions?${params.toString()}`
      )

    - 27.6 — Refetch When Filters Change
      Current:
      useEffect(() => {
      loadTransactions()
      }, [])

      Replace:
      useEffect(() => {
      loadTransactions()
      }, [search, type, categoryId])

    - 27.Step 7 — Build Real Search Input  
      Open: src/components/transactions/TransactionFilters.tsx
      Create props:
      interface TransactionFiltersProps {
      search: string
      setSearch: (value: string) => void
      }

      Component:
      export function TransactionFilters({
      search,
      setSearch,
      }: TransactionFiltersProps) {
      return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      <input
      type="text"
      placeholder="Search transactions..."
      value={search}
      onChange={(e) =>
      setSearch(e.target.value)
      }
      className="
      w-full
      rounded-xl
      border
      border-zinc-700
      bg-zinc-900
      px-4
      py-3
      text-white
      outline-none
      "
      />
      </div>
      )
      }
