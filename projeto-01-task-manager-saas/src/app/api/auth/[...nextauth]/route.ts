// Cria os endpoints HTTP que o Auth.js precisa.
// GET → Responde a requisições GET (ex: /api/auth/session)
// POST → Responde a requisições POST (ex: /api/auth/callback/credentials)
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
