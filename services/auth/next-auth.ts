import { db } from "@/services/db";
import { Database, KyselyAdapter } from "@auth/kysely-adapter";

import { Kysely } from "kysely";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "../api";

export const nextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          console.log("authorize", await api.auth.validateUser(credentials));
          return await api.auth.validateUser(credentials);
        }
        return null;
      },
    }),
  ],
  adapter: KyselyAdapter(db as unknown as Kysely<Database>),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: undefined,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          ...user,
        };
      }
      return token;
    },

    session: async ({ session }) => {
      return session;
    },
  },
} satisfies NextAuthOptions;
/** Use it in server contexts */
export function getSession() {
  return getServerSession(nextAuthConfig);
}
