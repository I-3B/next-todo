import { getSession } from "@/services/auth/next-auth";
import { LayoutProps } from "@/types/next";
import { redirect } from "next/navigation";
import { TopBar } from "./top-bar";

export default async function Layout({ children }: LayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/register");
  }
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
