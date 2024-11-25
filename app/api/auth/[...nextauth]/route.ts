import { nextAuthConfig } from "@/services/auth/next-auth";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
