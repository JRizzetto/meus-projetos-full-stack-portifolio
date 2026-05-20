Regras de negócio iniciais

- User
  O usuário terá seus próprios dados financeiros.
  Nada de um usuário acessar transações de outro.

- Category: A categoria será criada por usuário.
  Food
  Salary
  Rent
  Transport
  Investments
  Entertainment

  Cada categoria terá: name, type, color, userId
  Campo type: INCOME (Salary) / EXPENSE (Food)

- Transaction: Cada transação terá:
  title
  amount
  type
  date
  description
  categoryId
  userId

  Campo type: INCOME (Salary) / EXPENSE (Food)
