import { PageProps } from "@/types/next";
import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page({}: PageProps) {
  return <RegisterForm />;
}
