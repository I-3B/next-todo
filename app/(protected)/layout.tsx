import { COOKIES } from "@/constants/cookies";
import { getSession } from "@/services/auth/next-auth";
import { LayoutProps } from "@/types/next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: LayoutProps) {
  const session = await getSession();

  if (!session) {
    const cookieStore = cookies();
    const hasVisited = cookieStore.has(COOKIES.HAS_VISITED);

    if (!hasVisited) {
      redirect("/auth/register");
    }

    redirect("/auth/sign-in");
  }
  return <>{children}</>;
}
