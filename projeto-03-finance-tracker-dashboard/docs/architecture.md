1. Visão do Produto: Uma plataforma financeira pessoal moderna com analytics, visualização de dados e experiência SaaS premium.

2. Core features (Principais características):
   Authentication: Register, Login, Logout, Session management, Protected routes, User-specific financial data
   Transactions: Usuário poderá criar transações, editar, deletar, visualizar histórico
   Transactions: Cada transação terá title, amount, type (income/expense), category, date, description
   Categories: Usuário poderá criar categorias personalizadas, usar categorias para analytics, separar receitas/despesas
   Categories: Exemplos Salary, Food, Rent, Transport, Investments
   Dashboard (coração do produto): Total Balance, Total Income, Total Expenses, Monthly Analytics, Recent Transactions, Charts, Financial Overview
   Filters: Usuário poderá filtrar por mês, categoria, tipo, período

3. Product Mentality
   quais dados o produto precisa?
   como o usuário navega?
   qual informação é prioridade?
   o que merece destaque visual?
   o que deve ficar no dashboard?
   o que precisa ser rápido?
   o que será Server Component?
   o que será Client Component?

4. Suggested Initial Pages
   Public: /
   Landing page: /login & /register
   Protected: /dashboard & /dashboard/transactions & /dashboard/categories

5. Initial Database Thinking
   User: Autenticação
   Transaction: Receitas/despesas
   Category: Categorias financeiras
   Talvez futuramente: MonthlyGoals, Budgets, Savings, RecurringTransactions

6. Visual Direction (IMPORTANT)
   Desired Feel(Sensação desejada): fintech SaaS, dark premium interface, analytical dashboard, elegant spacing, richer widgets, stronger typography hierarchy, cleaner charts, modern card system.

7. UI/UX Direction
   cards terão propósito
   gráficos terão destaque
   informações terão peso visual
   layout precisará “respirar”

8. Technical Evolution
   Backend: filtering, query params, aggregations, analytics logic, financial calculations
   Frontend: advanced dashboard UI, chart rendering, data visualization, layout systems, reusable components
   Architecture: scalable folders, reusable services, data separation, server/client boundaries
