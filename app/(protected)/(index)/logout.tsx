"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export type LogoutProps = {};
export function Logout({}: LogoutProps) {
  const mutation = useMutation({ mutationFn: () => signOut({}) });
  return (
    <Button isLoading={mutation.isPending} onClick={() => mutation.mutate()}>
      Logout
    </Button>
  );
}
