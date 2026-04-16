Documento inicial do Projeto 1 — Task Manager SaaS

1. Regras de negócio
   1.1 Cadastro
   • O usuário pode criar conta com nome, e-mail e senha.
   • O e-mail deve ser único.
   • Se já existir conta com aquele e-mail, o cadastro deve ser recusado.
   • A senha nunca será salva em texto puro.
   1.2 Login
   • O usuário pode entrar com e-mail e senha.
   • Se o e-mail não existir, o sistema retorna erro.
   • Se a senha estiver errada, o sistema retorna erro.
   • Se estiver correto, o usuário acessa a área privada.
   1.3 Acesso às páginas
   • Públicas: /, /login, /register
   • Privadas: /dashboard, /tasks
   • Usuário não autenticado não pode acessar páginas privadas.
   1.4 Tarefas
   • O usuário pode criar tarefas.
   • O usuário pode editar tarefas.
   • O usuário pode excluir tarefas.
   • O usuário pode atualizar status e prioridade.
   • O usuário vê apenas as próprias tarefas.
   1.5 Dashboard
   • Mostra apenas dados do usuário logado.
   • Exibe resumo das tarefas e lista recente.

---

2. Modelagem inicial do banco
   2.1 Entidades
   User
   • id
   • name
   • email
   • password
   • createdAt
   • updatedAt
   Task
   • id
   • title
   • description?
   • status
   • priority
   • dueDate?
   • createdAt
   • updatedAt
   • userId
   2.2 Relação
   • Um usuário pode ter muitas tarefas.
   • Uma tarefa pertence a um único usuário.
   2.3 Enums
   TaskStatus
   • PENDING
   • IN_PROGRESS
   • COMPLETED
   TaskPriority
   • LOW
   • MEDIUM
   • HIGH

---

3. Ordem prática da construção do frontend
   Essa parte será feita primeiro de forma estrutural, com dados mockados.
   Etapa 1 — Setup inicial do projeto
   • criar projeto Next.js com TypeScript
   • instalar Tailwind
   • limpar estrutura inicial
   • organizar pastas
   • definir estilos globais
   Etapa 2 — Componentes base
   • Button
   • Input
   • Card
   • Badge
   • Sidebar
   • Header
   Etapa 3 — Landing page
   Construir:
   • navbar
   • hero
   • seção de features
   • CTA final
   Etapa 4 — Login
   Construir:
   • card central
   • inputs
   • botão
   • link para cadastro
   Etapa 5 — Register
   Construir:
   • mesma base do login
   • campos extras
   Etapa 6 — Layout autenticado
   Construir:
   • sidebar
   • header
   • área de conteúdo
   Etapa 7 — Dashboard
   Construir com dados mockados:
   • cards de resumo
   • lista recente
   Etapa 8 — Tasks
   Construir com dados mockados:
   • cabeçalho
   • filtros
   • lista de tarefas
   • botões de ação
   • modal ou formulário visual
   Etapa 9 — Refinamento visual
   • responsividade
   • estados vazios
   • consistência visual
   • alinhamento e espaçamento

---

4. Ordem prática da construção do backend
   Aqui começa a parte de lógica real.
   Etapa 1 — Configuração do Prisma
   • instalar Prisma
   • iniciar Prisma no projeto
   • configurar .env
   • conectar com PostgreSQL
   Etapa 2 — Criar schema inicial
   • model User
   • model Task
   • enums de status e prioridade
   Etapa 3 — Rodar primeira migration
   • gerar migration inicial
   • criar banco estruturado
   Etapa 4 — Criar seed inicial
   • criar dados de teste
   • preparar ambiente para desenvolvimento
   Etapa 5 — Autenticação
   • configurar Auth.js
   • fluxo de login
   • fluxo de sessão
   • proteção de rotas privadas
   Etapa 6 — Cadastro de usuário
   • criar lógica de registro
   • validar dados com Zod
   • verificar e-mail duplicado
   • gerar hash da senha
   • salvar usuário no banco
   Etapa 7 — CRUD de tarefas
   Criar lógica para:
   • criar task
   • listar tasks do usuário logado
   • editar task
   • excluir task
   • atualizar status
   Etapa 8 — Segurança das operações
   • garantir que usuário só manipula as próprias tasks
   • validar entrada de dados
   • retornar erros corretos
   Etapa 9 — Dashboard backend
   • calcular total de tarefas
   • contar pendentes
   • contar em andamento
   • contar concluídas
   • buscar tarefas recentes

---

5. Banco de dados, migrations e seed
   Essa parte é importantíssima para projeto profissional.
   5.1 Banco
   • PostgreSQL como banco principal
   • conexão local no desenvolvimento
   • conexão remota no deploy
   5.2 Migrations
   Sempre que o schema mudar:
   • criar nova migration
   • versionar no projeto
   • manter histórico das mudanças
   5.3 Seed
   Criar seed para:
   • popular banco em desenvolvimento
   • testar interface sem precisar criar tudo manualmente
   • facilitar demonstração
   5.4 Cuidados importantes
   • nunca editar dados direto no banco sem necessidade
   • nunca perder controle das migrations
   • nunca deixar senha sem hash
   • nunca depender de estrutura “improvisada”

---

6. Integração full stack
   Depois de frontend estrutural e backend base, entra a integração.
   Etapa 1 — Integrar cadastro
   • form do register envia dados reais
   • backend valida
   • usuário é salvo no banco
   Etapa 2 — Integrar login
   • login passa a usar autenticação real
   • sessão passa a existir
   Etapa 3 — Integrar dashboard
   • dados mockados saem
   • dados reais do usuário entram
   Etapa 4 — Integrar tasks
   • formulário cria tasks reais
   • lista mostra tasks reais
   • editar e excluir passam a afetar o banco
   Etapa 5 — Estados da interface
   • loading
   • erro
   • vazio
   • sucesso

---

7. Deploy e publicação
   7.1 Banco
   • usar PostgreSQL hospedado
   • opção inicial: Neon
   7.2 Aplicação
   • usar Vercel para hospedar o Next.js
   7.3 Ambiente
   Configurar variáveis como:
   • DATABASE_URL
   • AUTH_SECRET
   • AUTH_URL ou equivalente
   • qualquer variável necessária para produção
   7.4 Fluxo de deploy
   • subir repositório no GitHub
   • conectar com Vercel
   • configurar variáveis
   • rodar migrations em produção
   • validar login
   • validar CRUD
   • validar persistência dos dados
   7.5 Cuidados
   • conferir se rotas privadas estão protegidas
   • conferir se banco está persistindo dados corretamente
   • testar o projeto após deploy
   • revisar se não há chaves sensíveis expostas

---

8. Melhorias futuras
   Essas melhorias não entram no MVP, mas podem virar evolução do projeto:
   • perfil do usuário
   • foto/avatar
   • paginação
   • ordenação avançada
   • labels
   • categorias
   • subtarefas
   • dark mode
   • colaboração entre usuários
   • drag and drop estilo Trello real

---

Ordem geral oficial do projeto
Se eu fosse resumir tudo em uma trilha única, ficaria assim:
Fase 1 — Planejamento

1. regras de negócio
2. modelagem do banco
3. estrutura das páginas
   Fase 2 — Frontend estrutural
4. setup do projeto
5. componentes base
6. landing
7. login
8. register
9. layout autenticado
10. dashboard visual
11. tasks visual
    Fase 3 — Backend e banco
12. configurar Prisma
13. criar schema
14. migrations
15. seed
16. autenticação
17. cadastro
18. CRUD de tasks
19. dashboard backend
    Fase 4 — Integração
20. conectar forms
21. conectar tasks
22. conectar dashboard
23. ajustar estados da UI
    Fase 5 — Finalização
24. responsividade
25. revisão visual
26. README
27. deploy
28. testes finais
