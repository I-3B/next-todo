import { PageProps } from "@/types/next";
import type { Metadata } from "next";
import { Logout } from "./logout";

export const metadata: Metadata = {};

export default function Page({}: PageProps) {
  return (
    <div className="justify-center mt-10 flex w-full">
      <Logout />
    </div>
  );
}
