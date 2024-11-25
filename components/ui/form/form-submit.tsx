"use client";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ElementRef, Ref } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export type FormSubmitProps = ButtonProps & { showOnDirtyOnly?: boolean };
export const FormSubmit = forwardRef(
  (
    { children, showOnDirtyOnly = false, ...props }: FormSubmitProps,
    ref: Ref<ElementRef<typeof Button>>
  ) => {
    const form = useFormContext();
    const hide = showOnDirtyOnly && Object.keys(form?.formState.dirtyFields).length < 1;
    return (
      !hide && (
        <Button
          type="submit"
          ref={ref}
          isLoading={form?.formState.isSubmitting}
          disabled={form?.formState.isSubmitting}
          {...props}
          className={cn(
            Object.keys(form.formState.errors).length !== 0 && "text-destructive",
            props.className
          )}
        >
          {children ?? "Submit"}
        </Button>
      )
    );
  }
);

FormSubmit.displayName = "FormSubmit";
