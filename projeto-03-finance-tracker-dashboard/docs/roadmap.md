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
