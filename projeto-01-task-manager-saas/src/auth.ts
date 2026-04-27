import NextAuth from "next-auth"; // Importa a biblioteca principal de autenticação
import Credentials from "next-auth/providers/credentials"; // 	Importa o provedor de login com email/senha (não Google/GitHub)
import bcrypt from "bcryptjs"; // Biblioteca para comparar senhas criptografadas

import { prisma } from "@/lib/prisma"; // Cliente do banco de dados para buscar usuários

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.BETTER_AUTH_SECRET, // Criptografa os tokens de sessão, Protege os cookies contra falsificação vem do ".env".
  providers: [
    Credentials({
      name: "Credentials", // Nome do provedor (aparece na página de login padrão)

      // Define quais campos serão solicitados
      credentials: {
        email: {},
        password: {},
      },

      // Função que VALIDA as credenciais
      async authorize(credentials) {
        // 1. Verifica se email e password foram enviados
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2. Busca o usuário no banco pelo email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // 3. Se usuário não existe, falha
        if (!user) {
          return null;
        }

        // 4. Compara a senha digitada com a senha criptografada do banco
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        // 5. Se senha incorreta, falha
        if (!isPasswordValid) {
          return null;
        }

        // 6. Sucesso! Retorna os dados do usuário (sem a senha!)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  // Token JWT armazenado no cookie	Recomendado (mais simples)
  session: {
    strategy: "jwt",
  },

  // Diz ao Auth.js: "Quando precisar mostrar a página de login, use a MINHA página /login"
  pages: {
    signIn: "/login",
  },
});
