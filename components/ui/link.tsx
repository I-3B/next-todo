import { cn } from "@/lib/utils";
import NextLink, { LinkProps as NexLinkProps } from "next/link";
import { ComponentPropsWithoutRef } from "react";

export type LinkProps = NexLinkProps & ComponentPropsWithoutRef<"a">;
export function Link({ className, ...props }: LinkProps) {
  return <NextLink className={cn("underline", className)} {...props} />;
}
