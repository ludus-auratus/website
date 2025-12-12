import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { DetailedSession } from "@/lib/api";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        /// @WIP: Lógica de Login
        return {
          id: "0",
          email: credentials?.email,
          password: credentials?.password,
        };
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
    signIn(params) {
      return true;
    },
  },
});

export { handler as GET, handler as POST };
