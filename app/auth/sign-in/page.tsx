import { PageProps } from "@/types/next";
import type { Metadata } from "next";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page({}: PageProps) {
  return <SignInForm />;
}
