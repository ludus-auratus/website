import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { DetailedSession, DetailedUser, LoginDTO, loginUser } from "@/lib/auth";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (!credentials || !credentials?.email || !credentials?.password) {
          return null;
        }

        const dto: LoginDTO = {
          email: credentials?.email,
          senha: credentials?.password,
        };

        /// @WIP: Lógica de Login
        const user = await loginUser(dto);
        if (!user) return null;

        return {
          id: `${user.id}`,
          email: user.email,
          name: user.nomeExibicao,
          image: user.imagem,
        } as DetailedUser;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    session({ session }) {
      // Adicionar dados detalhados ao contexto de sessão
      const detailed = session as DetailedSession;
      return detailed;
    },
    signIn() {
      return true;
    },
  },
});

export { handler as GET, handler as POST };
