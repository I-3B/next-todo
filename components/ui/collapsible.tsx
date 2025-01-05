"use client";

import { cn } from "@/lib/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import "./collapsible.css";
const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

function CollapsibleContent({
  className,
  animate = true,
  ...props
}: CollapsiblePrimitive.CollapsibleContentProps & { animate?: boolean }) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      {...props}
      className={cn(animate && "animate-collapsible-content", className)}
    />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
