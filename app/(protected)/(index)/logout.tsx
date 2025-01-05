"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export type LogoutProps = {};
export function Logout({}: LogoutProps) {
  const mutation = useMutation({ mutationFn: () => signOut({}) });

  return (
    <Button
      variant="ghost"
      size="icon"
      isLoading={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      <LogOut />
    </Button>
  );
}
