Fluxo completo do sistema

1. Landing page
   Essa é a página inicial pública.
   Objetivo
   Apresentar o produto para qualquer pessoa que entrar no site.
   O que terá
   • nome do produto
   • texto explicando o que ele faz
   • botão para criar conta
   • botão para login
   • seção de benefícios ou funcionalidades
   • visual profissional estilo SaaS
   Função no sistema
   Essa página não depende de login.
   Ela serve para:
   • apresentar o projeto
   • mostrar valor
   • direcionar o usuário para cadastro ou login

---

2. Cadastro
   Se o usuário ainda não tem conta, ele acessa a página de cadastro.
   O que acontece aqui
   O usuário preenche:
   • nome
   • e-mail
   • senha
   • confirmar senha
   Regras
   • o e-mail não pode já existir no sistema
   • a senha deve seguir a validação definida
   • se estiver tudo certo, a conta é criada
   Resultado
   Depois de criar a conta, ele pode:
   • ser redirecionado para login
   ou
   • já entrar automaticamente no sistema
   Para o Projeto 1, eu prefiro a lógica mais simples:
   • cadastra
   • depois faz login

---

3. Login
   Se o usuário já possui conta, ele vai para a tela de login.
   O que acontece aqui
   Ele informa:
   • e-mail
   • senha
   Regras
   • se o e-mail não existir, retorna erro
   • se a senha estiver errada, retorna erro
   • se estiver correto, entra no sistema
   Resultado
   Depois do login, ele é redirecionado para a área privada do sistema.

---

4. Área autenticada do usuário
   Depois que o login acontece, o usuário entra na parte interna do sistema.
   Aqui teremos duas páginas principais:
   • dashboard
   • tasks

---

5. Dashboard
   Essa é a página principal interna depois do login.
   Objetivo
   Dar uma visão geral rápida da conta do usuário.
   O que terá
   • total de tarefas
   • tarefas pendentes
   • tarefas em andamento
   • tarefas concluídas
   • talvez tarefas com vencimento próximo
   • lista pequena de tarefas recentes
   Regra principal
   O dashboard mostra somente os dados do usuário logado.
   Ele não pode ver dados de outras pessoas.
   Função no sistema
   Essa página dá sensação de produto real e mostra resumo geral.

---

6. Página de Tasks
   Essa é a página principal de gerenciamento.
   Objetivo
   Permitir ao usuário gerenciar as próprias tarefas.
   O que terá
   • lista de tarefas dele
   • botão para criar nova tarefa
   • opção de editar tarefa
   • opção de excluir tarefa
   • opção de alterar status
   • filtros por status
   • filtros por prioridade
   • busca por texto
   Regras
   Cada task pertence a um usuário específico.
   Então:
   • o usuário A vê apenas as tasks dele
   • o usuário B vê apenas as tasks dele
   • ninguém pode acessar task dos outros

---

Regra de segurança mais importante
Você perguntou se visualmente ele teria acesso às tasks de outros usuários.
A resposta correta é:
não.
Nem visualmente, nem logicamente, nem pelo banco.
Ou seja:
• o frontend não mostra tasks de outros usuários
• o backend não retorna tasks de outros usuários
• o banco relaciona cada task a um único usuário
Essa é a estrutura certa de um sistema com autenticação.

---

Resumo do comportamento do sistema
Vou escrever no mesmo estilo do que você começou, mas mais organizado.

---

Task Manager SaaS no estilo Trello
1 - Landing page que apresenta o projeto
Página pública com:
• apresentação do sistema
• benefícios
• chamada para ação
• botões de login e cadastro

---

2 - Opções de login e criar conta
O usuário escolhe:
• criar conta, se ainda não tiver cadastro
• fazer login, se já tiver conta

---

3 - Sistema de cadastro e login
O sistema terá autenticação básica.
Cadastro
• usuário informa nome, e-mail e senha
• o sistema verifica se o e-mail já existe
• se já existir, não permite novo cadastro
• se não existir, cria a conta
Login
• usuário informa e-mail e senha
• se estiver correto, entra no sistema
• se estiver incorreto, recebe mensagem de erro

---

4 - Home interna após login
Depois de entrar, o usuário vai para a área interna do sistema.
Essa área terá:
• dashboard
• tasks

---

5 - Dashboard de tasks
No dashboard o usuário verá um resumo das próprias tarefas:
• total
• pendentes
• em andamento
• concluídas
• tarefas recentes

---

6 - Gerenciamento de tarefas
Dentro da página de tasks, o usuário poderá:
• adicionar tarefas
• editar tarefas
• remover tarefas
• alterar status
• visualizar prioridade
• filtrar tarefas

---

7 - Regra de acesso
Cada usuário verá apenas as próprias tasks.
O sistema não permitirá que um usuário:
• veja tasks de outro usuário
• edite tasks de outro usuário
• apague tasks de outro usuário

---

Fluxo do usuário na prática
Fica assim:
Landing page
→ clique em criar conta ou login
→ Cadastro ou Login
→ entra no sistema
→ vai para o Dashboard
→ acessa a página de Tasks
→ cria, edita, conclui ou exclui suas tarefas

---

Estrutura final das páginas
Serão estas 5:
• / → landing page
• /login
• /register
• /dashboard
• /tasks
Sim, continuam sendo 5 páginas.
