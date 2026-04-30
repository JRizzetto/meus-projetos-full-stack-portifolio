# HabitFlow — Habit Tracker Dashboard

## Objetivo

O HabitFlow é uma aplicação full stack para acompanhamento de hábitos diários. O sistema permite que usuários criem hábitos, registrem conclusões diárias e acompanhem métricas de progresso, como streaks, frequência e consistência.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Auth.js
- Zod
- bcrypt

## Funcionalidades MVP

- Registro de usuário
- Login
- Sessão autenticada
- Proteção de rotas
- Criar hábito
- Listar hábitos
- Editar hábito
- Deletar hábito
- Marcar hábito como concluído no dia
- Visualizar progresso diário
- Visualizar métricas básicas

## Entidades principais

- User
- Habit
- HabitCompletion

## Regras de negócio

- Cada usuário só pode acessar seus próprios hábitos.
- Um hábito pode ser concluído uma vez por dia.
- O usuário pode desmarcar um hábito concluído no mesmo dia.
- Hábitos deletados removem também seus registros de conclusão.
- Métricas devem ser calculadas com base no histórico de conclusões.

## Evolução em relação ao Projeto 1

Este projeto evolui o Task Manager SaaS porque adiciona regras de negócio baseadas em datas, histórico de ações e cálculo de métricas, indo além de um CRUD tradicional.
