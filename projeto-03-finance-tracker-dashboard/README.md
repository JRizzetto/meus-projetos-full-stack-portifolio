# 💰 FinanceTracker

Aplicação Full Stack para gerenciamento financeiro pessoal, desenvolvida com **Next.js, React, TypeScript, Prisma, PostgreSQL e NextAuth**.

## 🌐 Demonstração

🔗 **Aplicação:** https://finance-tracker-pied-chi.vercel.app/

📂 **Repositório:** https://github.com/JRizzetto

## 📖 Sobre o projeto

O **FinanceTracker** é uma aplicação web desenvolvida para auxiliar usuários no controle de suas finanças pessoais.

Com ela é possível cadastrar receitas, despesas, categorias e metas financeiras, além de acompanhar indicadores por meio de um dashboard intuitivo.

Este projeto foi desenvolvido com o objetivo de consolidar conhecimentos em desenvolvimento Full Stack utilizando o ecossistema moderno do Next.js.

## ✨ Funcionalidades

- ✅ Cadastro e autenticação de usuários
- ✅ Dashboard com indicadores financeiros
- ✅ Gerenciamento de receitas e despesas
- ✅ CRUD completo de categorias
- ✅ CRUD completo de metas financeiras
- ✅ Estatísticas em tempo real
- ✅ Interface responsiva
- ✅ Validação de formulários
- ✅ Rotas protegidas

## 🚀 Tecnologias

### Front-end

- React
- Next.js
- TypeScript
- Tailwind CSS

### Back-end

- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)
- NextAuth

### Outras bibliotecas

- React Hot Toast
- Recharts
- Zod

## 📸 Screenshots

### 🏠 Landing Page

![Landing Page](assets/screenshots/landing-page.png)

---

### 📊 Dashboard

![Dashboard](assets/screenshots/dashboard.png)

---

### 💳 Transactions

![Transactions](assets/screenshots/transactions.png)

---

### 🗂 Categories

![Categories](assets/screenshots/categories.png)

---

### 🎯 Financial Goals

![Goals](assets/screenshots/goals.png)

## 📂 Estrutura do Projeto

```bash
📦 projeto-03-finance-tracker-dashboard
├── prisma/                 # Schema e configurações do banco de dados
├── public/                 # Arquivos públicos
├── src/
│   ├── app/                # Rotas e páginas da aplicação
│   ├── components/         # Componentes reutilizáveis
│   ├── generated/          # Prisma Client gerado automaticamente
│   ├── lib/                # Configurações (Prisma, Auth, etc.)
│   ├── types/              # Tipagens TypeScript
│   └── middleware.ts       # Proteção de rotas
├── assets/
│   └── screenshots/        # Imagens utilizadas no README
├── .env
├── package.json
└── README.md
```

A estrutura do projeto foi organizada seguindo boas práticas do ecossistema **Next.js App Router**, separando responsabilidades entre componentes, páginas, rotas de API, configurações e acesso ao banco de dados, facilitando a manutenção e escalabilidade da aplicação.

## 🏗 Arquitetura

A aplicação segue uma arquitetura Full Stack utilizando o App Router do Next.js.

Fluxo da aplicação:

Usuário
↓
Interface (React + Next.js)
↓
API Routes
↓
Prisma ORM
↓
PostgreSQL (Neon)

## ⚙️ Instalação

Siga os passos abaixo para executar o projeto localmente.

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/projeto-03-finance-tracker-dashboard.git
```

### 2. Acesse a pasta do projeto

```bash
cd projeto-03-finance-tracker-dashboard
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto seguindo o modelo apresentado na seção **Variáveis de Ambiente**.

### 5. Execute as migrações do banco de dados

```bash
npx prisma migrate deploy
```

> Caso esteja utilizando um banco de dados vazio para desenvolvimento, utilize o comando adequado para criar a estrutura do banco.

### 6. Inicie o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

## 🔑 Variáveis de Ambiente

Para executar o projeto, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"

NEXTAUTH_SECRET="your-secret-key"

NEXTAUTH_URL="http://localhost:3000"
```

### Descrição das variáveis

| Variável          | Descrição                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`    | String de conexão com o banco de dados PostgreSQL (Neon).                                                                              |
| `NEXTAUTH_SECRET` | Chave utilizada pelo NextAuth para assinar e validar sessões.                                                                          |
| `NEXTAUTH_URL`    | URL base da aplicação. Em desenvolvimento utilize `http://localhost:3000`. Em produção utilize a URL da aplicação publicada no Vercel. |

> **Importante:** Nunca envie seu arquivo `.env` para o GitHub. Utilize sempre valores próprios para o seu ambiente.

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, tive a oportunidade de aprofundar meus conhecimentos em desenvolvimento Full Stack utilizando o ecossistema do Next.js.

Os principais aprendizados foram:

- Construção de uma aplicação Full Stack utilizando o App Router do Next.js.
- Implementação de autenticação de usuários com NextAuth.
- Modelagem de banco de dados relacional utilizando Prisma ORM e PostgreSQL (Neon).
- Desenvolvimento de APIs REST utilizando API Routes do Next.js.
- Criação de componentes reutilizáveis em React.
- Gerenciamento de estado utilizando React Hooks.
- Validação de formulários e tratamento de erros.
- Organização de projetos seguindo boas práticas de arquitetura e componentização.
- Deploy de uma aplicação Full Stack utilizando a Vercel.
- Utilização do Git e GitHub para versionamento durante todo o desenvolvimento.

Este projeto representou um grande passo na minha jornada como desenvolvedor, pois reuniu em uma única aplicação diversos conceitos estudados ao longo dos últimos meses, desde desenvolvimento Front-end até Back-end, autenticação, banco de dados, APIs e deploy em produção.

Além de colocar em prática tecnologias modernas, também pude evoluir na organização de código, componentização, resolução de problemas e documentação de projetos.

---

## 👨‍💻 Autor

Desenvolvido por **Jefferson Rizzetto**.

📧 **E-mail:** jeffersonrizzetto@gmail.com

💼 **LinkedIn:** https://www.linkedin.com/in/jefferson-rizzetto/

🐙 **GitHub:** https://github.com/JRizzetto

---

⭐ Se este projeto foi útil ou interessante para você, considere deixar uma estrela no repositório!
