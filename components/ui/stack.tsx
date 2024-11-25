import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

export const stackVariants = cva("flex flex-col", {
  variants: {
    gap: {
      default: "",
      form: "gap-2 sm:gap-4",
      lg: "gap-2 sm:gap-5 md:gap-8",
      xl: "gap-4 sm:gap-5 md:gap-12",
    },
  },
  defaultVariants: {
    gap: "default",
  },
});
export type StackProps = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof stackVariants> & { asChild?: boolean };
export function Stack({ gap, className, asChild = false, ...props }: StackProps) {
  const Comp = asChild ? Slot : "div";
  return <Comp {...props} className={stackVariants({ gap, className })} />;
}
