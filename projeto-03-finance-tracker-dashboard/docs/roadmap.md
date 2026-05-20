Projeto 3 — Finance Tracker Dashboard.

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

1. Arquitetura e visão do produto
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

---

2. Database & Prisma Architecture
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

---

3. Neon Database + First Migration
   - Criar projeto no Neon db: finance-tracker-dashboard
   - Copiar a DATABASE_URL: Dashboard → Connection Details → copie a string de conexão PostgreSQL
   - Colar no .env: Substitua DATABASE_URL="sua_url_do_neon_aqui" copiada do neon
   - Rodar primeira migration: "npx prisma migrate dev --name init"
     Esse comando vai: criar as tabelas, criar o histórico de migrations, gerar o Prisma Client, sincronizar banco + schema

4. Prisma Client Architecture + Auth Foundation
   Agora vamos construir a base da nossa arquitetura de backend, Antes da autenticação, precisamos:
   - Agora gere o Prisma Client: "npx prisma generate"
   - Prisma Client setup
   - conexão de banco de dados reutilizável
   - estrutura de projeto escalável
   1. Criar arquivo de cliente Prisma
      Criar a pasta: src/lib/prisma.ts (arquivo com código no codigos.md)
   2. Test Prisma Connection
      src/app/api/test/route.ts (arquivo com código no codigos.md)
