- Projeto 3 — Finance Tracker Dashboard.

Pasta principal criada dentro do projeto:
C:\Users\jeffe\Programador\meus-projetos-full-stack-portifólio\3-finance-tracker-dashboard

No terminal do VS Code, dentro dessa pasta, rode:
npx create-next-app@latest .
Na janela que abrir escolhar para customizar a instalação

Would you like to use TypeScript? Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like your code inside a `src/` directory? yes
Would you like to use App Router? Yes
Would you like to use Turbopack? Yes
Would you like to customize the import alias? Yes
Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? » Yes
Would you like to use React Compiler? » No

Depois que instalar, rode:
npm run dev

---

1.  Arquitetura e visão do produto
    vamos definir: o produto, as regras de negócio, as entidades, os fluxos, a arquitetura inicial
    Entrar no arquivo: architecture.md

    Instalar as bibliotecas principais do projeto
    - npm install next-auth @auth/prisma-adapter prisma @prisma/client bcryptjs zod react-hot-toast recharts
    - npm install -D tsx
      next-auth: Sistema completo de autenticação para Next.js - Gerencia login, sessão, proteção de rotas, refresh tokens
      @auth/prisma-adapter: Ponte entre NextAuth e seu banco Prisma - Permite armazenar usuários/sessões no PostgreSQL via Prisma
      prisma & @prisma/client: ORM para comunicação com PostgreSQL - Tipagem automática, migrations, query builder seguro (evita SQL injection)
      bcryptjs: Hash de senhas (versão puro JavaScript) - Proteger senhas no banco de dados
      zod: Validação de schemas TypeScript-first - Validar dados antes de salvar (usuário, email, transações, categorias, etc)
      react-hot-toast: Notificações toast elegantes - Feedback instantâneo (transação salva, erro ao deletar)
      recharts: Biblioteca de gráficos React

    npm install -D tsx

2.  Database & Prisma Architecture
    Para esse projeto, o banco precisa representar um produto financeiro real, não só uma lista de transações.
    - User
    - Category
    - Transaction

    - A lógica será:
      User 1 ---- N Category
      User 1 ---- N Transaction
      Category 1 ---- N Transaction

    - Ou seja:
      um usuário pode ter várias categorias
      um usuário pode ter várias transações
      uma categoria pode estar ligada a várias transações
      cada transação pertence a um usuário
      cada transação pode pertencer a uma categoria

    - Regras de negócio
      Entrar no arquivo: business-rules.md

    - Primeiro comando Prisma
      Agora no terminal rode: "npx prisma init" (A pasta "prisma/schema.prisma" deve ser criada)

    Abra prisma/schema.prisma e coloque o conteúdo:
    database-modeling.md
    Entrar no arquivo: database-modeling.md

3.  Neon Database + First Migration
    - Criar projeto no Neon db: finance-tracker-dashboard
    - Copiar a DATABASE_URL: Dashboard → Connection Details → copie a string de conexão PostgreSQL
    - Colar no .env: Substitua DATABASE_URL="sua_url_do_neon_aqui" copiada do neon
    - Rodar primeira migration: "npx prisma migrate dev --name init"
      Esse comando vai: criar as tabelas, criar o histórico de migrations, gerar o Prisma Client, sincronizar banco + schema

4.  Prisma Client Architecture + Auth Foundation
    Agora vamos construir a base da nossa arquitetura de backend, Antes da autenticação, precisamos:
    - Agora gere o Prisma Client: "npx prisma generate"
    - Prisma Client setup
    - conexão de banco de dados reutilizável
    - estrutura de projeto escalável
      4.1. Criar arquivo de cliente Prisma
      Criar a pasta: src/lib/prisma.ts (arquivo com código no codigos.md)
      4.2. Test Prisma Connection
      src/app/api/test/route.ts (arquivo com código no codigos.md)

5.  Authentication Architecture (NextAuth)
    Now the project officially starts becoming a SaaS platform.
    - 5.1. Create Auth Folder Structure
      src/lib/auth.ts
    - 5.2. Create Zod Validation Schema Folder
      src/schemas/register-schema.ts
    - 5.3. Create Register Schema
      inside src/schemas/register-schema.ts (arquivo com código no codigos.md)
    - 5.4. Create Register API Route
      Create: src/app/api/register/route.ts (we are not imprementing it yet)

6.  Register Backend
    The flow will be: Receive request, Validate body with Zod, Check if user already exists, Hash password, Create user, Return safe response
    - 6.1 - Inside: src/app/api/register/route.ts (arquivo com código no codigos.md)
    - Test in Insomnia, Create a POST request: http://localhost:3000/api/register
      {
      "name": "Jefferson Rizzetto",
      "email": "jefferson@test.com",
      "password": "123456"
      }

7.  NextAuth Configuration
    The core authentication layer of the application.
    This is where: login, sessions, protected routes, authenticated users
    - 7.1 - Create Auth Route Structure
      src/app/api/auth/[...nextauth]/route.ts
      NextAuth uses it internally for: login, logout, session, callbacks, authentication flow
    - 7.2. Configure auth.ts
      Inside: "src/lib/auth.ts" (arquivo com código no codigos.md)
    - 7.3. Configure NextAuth Route
      Open: src/app/api/auth/[...nextauth]/route.ts (arquivo com código no codigos.md)
    - 7.4. Add Environment Variables
      Inside .env
      NEXTAUTH_SECRET=super-secret-key
      NEXTAUTH_URL=http://localhost:3000
      For now, any random string is fine for development.

8.  Login, Session Testing and Protected Route
    - 8.1. Create a Login Schema
      Create: src/schemas/login-schema.ts (arquivo com código no codigos.md)
    - 8.2. Test Login with NextAuth
      NextAuth already created the login endpoint for us: POST /api/auth/callback/credentials
    - 8.3. Create a Session Test Route
      Create: src/app/api/session-test/route.ts (arquivo com código no codigos.md)
      Now access: http://localhost:3000/api/session-test
      {
      "session": null
      }
    - 8.4. Create a Protected API Route
      Create: src/app/api/protected-test/route.ts (arquivo com código no codigos.md)
      Now access: http://localhost:3000/api/protected-test
      {
      "message": "Unauthorized."
      }

9.  Authentication UI Architecture
    Pages We’ll Build: /register & /login
    Both pages will: use Client Components, use React state, communicate with backend APIs, display loading states, display error messages, redirect users after authentication
    - 9.1. Create Auth Pages
      Create: src/app/register/page.tsx and src/app/login/page.tsx
    - 9.2. Create Auth Components Folder
      Create: src/components/auth
      Inside we’ll eventually have: LoginForm.tsx, RegisterForm.tsx, AuthCard.tsx, AuthInput.tsx
    - 9.3. Create RegisterForm Component
      Create: src/components/auth/RegisterForm.tsx (arquivo com código no codigos.md)
    - 9.4. Render RegisterForm in Page
      Inside: src/app/register/page.tsx (arquivo com código no codigos.md)
    - 9.5. Create LoginForm Component
      Create: src/components/auth/LoginForm.tsx (arquivo com código no codigos.md)
    - 9.6. Render LoginForm in Page
      Inside: src/app/login/page.tsx (arquivo com código no codigos.md)

10. Real Register Form + API Integration
    Open: src/components/auth/RegisterForm.tsx
    Replace everything with: (code in codigos.md)
    Now we need the toast provider.
    Open: src/app/layout.tsx
    Add: import { Toaster } from "react-hot-toast"
    And inside <body>, add: <Toaster position="top-right" />
    Now test: http://localhost:3000/register

11. Real Login Flow + Session Authentication
    Now we’ll implement: real login, session creation, authentication state, redirect after login
    - 11.1. Install NextAuth React Helpers: npm install next-auth
    - 11.2. Create Providers Component
      Create: src/components/providers.tsx (code in codigos.md)
    - 11.3. Configure layout.tsx
      Import: import { Providers } from "@/components/providers"
      Then wrap children:
      <body>
        <Providers>
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    - 11.4. Build Real Login Form
      Open: src/components/auth/LoginForm.tsx (code in codigos.md)
    - 11.5. Test Login  
      Access: http://localhost:3000/login
      Use the user you created earlier.

12. Protected Dashboard + Route Protection
    12.1. Create Dashboard Page
    Create: src/app/dashboard/page.tsx
    12.2. Protect the Dashboard Route (code in codigos.md)

13. Dashboard Layout Architecture
    Create: src/app/dashboard/layout.tsx (code in codigos.md)
    Now update: src/app/dashboard/page.tsx (code in codigos.md)

14. SaaS Dashboard Shell
    We’ll now build: Topbar, User info, Logout button, Better layout hierarchy, More professional dashboard structure
    - 14.1. Create Dashboard Components Folder
      Create: src/components/dashboard
      Inside we’ll create: DashboardSidebar.tsx, DashboardTopbar.tsx, UserMenu.tsx
    - 14.2. Create DashboardSidebar Component
      Create: src/components/dashboard/DashboardSidebar.tsx (code in codigos.md)
    - 14.3. Create DashboardTopbar Component
      Create: src/components/dashboard/DashboardTopbar.tsx (code in codigos.md)
    - 14.4. Create UserMenu Component
      Create: src/components/dashboard/UserMenu.tsx
    - 14.5. Update Dashboard Layout
      Now replace your: src/app/dashboard/layout.tsx

15. Financial Summary Cards Architecture
    - 15.1. Create Summary Components Folder
      create: src/components/dashboard/summary
      Inside create: SummaryCard.tsx, SummaryCards.tsx
    - 15.2. Create SummaryCard Component
      Create: src/components/dashboard/summary/SummaryCard.tsx (code in codigos.md)
    - 15.3. Create SummaryCards Component
      Create: src/components/dashboard/summary/SummaryCards.tsx (code in codigos.md)
    - 15.4. Update Dashboard Page
      Open: src/app/dashboard/page.tsx (code in codigos.md)

16. Real Financial Data Architecture
    Before summary cards can be real, we need transactions in the database. So the correct order is:
    Create transaction model logic
    Create transaction API
    Create test transactions
    Calculate dashboard metrics
    Render real summary cards
    - 16.1. Create transaction schema
      Create: src/schemas/transaction-schema.ts
    - 16.2. Create transactions API route
      src/app/api/transactions/route.ts

17. Category API Architecture
    Categories are critical because they power: analytics, charts, filters, expense organization, dashboard insights
    - 17.1. Create Category Schema
      Create: src/schemas/category-schema.ts
    - 17.2. Create Categories API Route
      Create: src/app/api/categories/route.ts
    - 17.3. Test in Insomnia
      POST: http://localhost:3000/api/categories
      Body:
      {
      "name": "Food",
      "type": "EXPENSE",
      "color": "#ef4444"
      }

      Then create: Salary, Investments, Rent, Transport
      Example:
      {
      "name": "Salary",
      "type": "INCOME",
      "color": "#22c55e"
      }

18. Category UI + Authenticated API Integration
    Before creating transactions, we need a way to create categories from the browser.
    - 18.1. Create Category Form
      Create: src/components/dashboard/categories/CategoryForm.tsx
    - 18.2. Create Categories Page
      Create: src/app/dashboard/categories/page.tsx
    - 18.3. Test
      Go to: http://localhost:3000/dashboard/categories
      Create these categories:
      Salary — INCOME
      Investments — INCOME
      Food — EXPENSE
      Rent — EXPENSE
      Transport — EXPENSE

19. Real Transaction Form Architecture
    We’ll build: transaction creation form, category selection, authenticated API integration, financial flow foundation
    - 19.1. Create Transactions Components Folder
      Create: src/components/dashboard/transactions
      Inside create: TransactionForm.tsx
    - 19.2. Build TransactionForm
      Create: src/components/dashboard/transactions/TransactionForm.tsx
    - 19.3. Create Transactions Page
      Create: src/app/dashboard/transactions/page.tsx
    - 19.4. Test Transaction Flow
      Go to: http://localhost:3000/dashboard/transactions
      Create: salary, food expenses, rent, transport, investments
      Example:
      Salary — $5000
      Food — $120
      Rent — $900

20. Financial Analytics Architecture
    - 20.1. Create Dashboard Metrics API
      Create: src/app/api/dashboard/route.ts
    - 20.2. Create Dashboard Metrics Hook
      Create: src/hooks/useDashboardMetrics.ts
    - 20.3. Refactor SummaryCards
      Open: src/components/dashboard/summary/SummaryCards.tsx
    - Test Go to: /dashboard

21. Recent Transactions Widget + Dashboard Composition
    Now we will make the dashboard feel much more like a real fintech product.
    Current dashboard: Summary Cards
    - Target dashboard:
      Summary Cards
      Recent Transactions
      Charts (next)
      Analytics (next)
    - 21.1. Create Recent Transactions Component
      Create: src/components/dashboard/transactions/RecentTransactions.tsx
    - 21.2. Update Dashboard Page
      Open: src/app/dashboard/page.tsx
      Add: import { RecentTransactions } from "@/components/dashboard/transactions/RecentTransactions"

22. Monthly Expense Chart with Recharts
    This is the first real analytics widget of the project.
    - 22.1. Create Chart Component
      Create: src/components/dashboard/charts
      Inside: MonthlyExpensesChart.tsx
    - 22.2. Create Dashboard Analytics API
      Create: src/app/api/dashboard/analytics/route.ts
    - 22.3. Create Chart Component
      Open: src/components/dashboard/charts/MonthlyExpensesChart.tsx
    - 22.4. Add Chart to Dashboard
      Open: src/app/dashboard/page.tsx
      Import: import { MonthlyExpensesChart } from "@/components/dashboard/charts/MonthlyExpensesChart"
      Then render below Recent Transactions: <MonthlyExpensesChart />

23. Category Distribution Pie Chart
    - 23.1. Create Analytics API
      Create: src/app/api/dashboard/category-distribution/route.ts
    - 23.2. Create Pie Chart Component
      Create: src/components/dashboard/charts/CategoryDistributionChart.tsx
    - 23.3. Add to Dashboard
      Open: src/app/dashboard/page.tsx
      Import: import { CategoryDistributionChart } from "@/components/dashboard/charts/CategoryDistributionChart"
      Render below the bar chart: <CategoryDistributionChart />

24. Transaction Filters Architecture
    Allow users to filter transactions by:
    Category
    Transaction Type
    Date Range
    Search Term
    - 24.1 - Extend Transactions API
      Instead of creating a new endpoint, we'll improve: /api/transactions
    - 24.2 — Read Search Params
      Open: src/app/api/transactions/route.ts
      Inside your GET function: export async function GET(request: Request)
      Add:
      const { searchParams } = new URL(request.url)
      const type = searchParams.get("type")
      const categoryId = searchParams.get("categoryId")
      const search = searchParams.get("search")
    - 24.3 — Dynamic Prisma Filter
      Before your findMany():
      const filters: {
      userId: string
      type?: "INCOME" | "EXPENSE"
      categoryId?: string
      title?: {
      contains: string
      mode: "insensitive"
      }
      } = {
      userId: user.id,
      }

    Add:
    if (type === "INCOME" || type === "EXPENSE") {
    filters.type = type
    }

    Add:
    if (type === "INCOME" || type === "EXPENSE") {
    filters.type = type
    }

    Add:
    if (search) {
    filters.title = {
    contains: search,
    mode: "insensitive",
    }
    }

    Replace your current query with:
    const transactions = await prisma.transaction.findMany({
    where: filters,
    include: {
    category: true,
    },
    orderBy: {
    date: "desc",
    },
    })

    URL test:
    http://localhost:3000/api/transactions?type=EXPENSE
    http://localhost:3000/api/transactions?type=INCOME
    http://localhost:3000/api/transactions?search=uber
    http://localhost:3000/api/transactions?search=salary

25. Transaction Filters UI + Transactions Page
    This is where users actually interact with the filtering system.
    - 25.1 — Open Transactions Page
      Open: src/app/dashboard/transactions/page.tsx
    - 25.2 — Create Transactions Table Component
      Create: src/components/transactions
      inside: TransactionsTable.tsx
      Open: src/app/dashboard/transactions/page.tsx
      inside:
      Import into page: import { TransactionsTable } from "@/components/transactions/TransactionsTable"
      Render: <TransactionsTable />
    - 25.3 — Create Search Filter Component
      Create: src/components/transactions/TransactionFilters.tsx
      Render above the table:  
      <TransactionFilters />
      <TransactionsTable />

26. Real Transactions Table
    - 26.1 — Create Transaction Type
      Inside: src/types
      Create: transaction.ts

    - 26.2 — Build TransactionsTable
      Open: src/components/transactions/TransactionsTable.tsx

27. Connect Filters to the Transactions Table
    Product Goal When the user changes: Search, Transaction Type, Category - the table should automatically display the filtered results.
    - 27.1 — Lift State Up
      Open: src/app/dashboard/transactions/page.tsx
      Convert it to a Client Component:

    - 27.2 — Pass State to Filters
      Future structure:

    - 27.3 — Pass Filters to Table
      <TransactionsTable
        search={search}
        type={type}
        categoryId={categoryId}
      />

    - 27.4 — Update TransactionsTable Props
      Create interface:
      Update component:

    - 27.5 — Dynamic Fetch URL

    - 27.6 — Refetch When Filters Change
      Current:
      Replace:

    - 27.Step 7 — Build Real Search Input  
      Open: src/components/transactions/TransactionFilters.tsx
      Create props:
      Component:

28. Advanced Filters UI
    - 28.1 — Load Categories
      We need categories for the dropdown.
      Inside: src/components/transactions/TransactionFilters.tsx
      Create:
      interface Category {
      id: string
      name: string
      }
      State: const [categories, setCategories] = useState<Category[]>([])
      Load categories:
      useEffect(() => {
      async function loadCategories() {
      const response = await fetch("/api/categories")

          const data = await response.json()

          setCategories(data)

      }

      loadCategories()
      }, [])

    - 28.2 — Expand Props
      Current:
      search
      setSearch

      Add:
      type
      setType
      categoryId
      setCategoryId

      Interface: (codigos.md)

    - 28.3 — Add Type Select
      Below search input: (codigos.md)

    - 28.4 — Add Category Select (codigos.md)

    - 28.5 — Better Layout
      Replace the wrapper with: (codigos.md)

29. Date Range Filtering Architecture
    Add two new filters: Start Date, End Date
    Example:
    Start Date: 2025-01-01
    End Date: 2025-03-31
    Result: Only transactions between January and March
    - 29.1 — Backend First - Update Transactions API
      Open:
      src/app/api/transactions/route.ts
      Add:
      const startDate = searchParams.get("startDate")
      const endDate = searchParams.get("endDate")
      Extend Filter Type (codigos.md)
      Add Date Filters
      Below existing filters:
      if (startDate || endDate) {
      filters.date = {}
      }
      Start date:
      if (startDate) {
      filters.date!.gte = new Date(startDate)
      }
      End date:
      if (endDate) {
      filters.date!.lte = new Date(endDate)
      }
      Now the API supports:
      /api/transactions?startDate=2025-01-01
      /api/transactions?endDate=2025-03-31
      /api/transactions?startDate=2025-01-01&endDate=2025-03-31
    - 29.2 — Test Backend
      Browser: /api/transactions?startDate=2025-01-01&endDate=2025-02-28
      Expected: Only January and February transactions
      If this works: ✅ Backend complete
    - 29.3 — Add Date State
      Open: src/app/dashboard/transactions/page.tsx
      Add:
      const [startDate, setStartDate] = useState("")
      const [endDate, setEndDate] = useState("")
    - 29.4 — Pass Props
      To Filters: (codigos.md)
      To Table: (codigos.md)
    - 29.5 — Update Filter Component
      Extend props: (codigos.md)
      Add inputs: (codigos.md)
    - 29.6 — Update Transactions Table
      Add props:
      startDate: string
      endDate: string

      Build URL params: (codigos.md)
      Update dependencies: (codigos.md)

      Better Layout
      You currently have:
      Search
      Type
      Category
      Now you'll have:
      Search
      Type
      Category
      Start Date
      End Date
      I'd recommend changing: md:grid-cols-3
      to: lg:grid-cols-5
