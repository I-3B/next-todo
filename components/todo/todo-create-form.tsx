"use client";
import { formName } from "@/lib/client/form";
import { revalidateCurrentPath } from "@/lib/client/next-cache-client";
import { handleActionSubmit } from "@/lib/server-action";
import { todoCreateSchema } from "@/services/todo/schemas/create";
import { z } from "@hono/zod-openapi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { Form } from "../ui/form";
import { FormInput } from "../ui/form/form-input";
import { FormSubmit } from "../ui/form/form-submit";
import { FormTextarea } from "../ui/form/form-textarea";
import { Stack } from "../ui/stack";
import { todoCreateAction } from "./actions";

export type TodoCreateFormProps = {};
export function TodoCreateForm({}: TodoCreateFormProps) {
  const form = useForm<z.infer<typeof todoCreateSchema>>({
    resolver: zodResolver(todoCreateSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const n = formName<typeof form>;

  return (
    <Form {...form}>
      <form
        className="w-full"
        onSubmit={handleActionSubmit(form, todoCreateAction, {
          onSuccess: () => {
            toast.success("Todo Added Successfully");
            form.reset();
            revalidateCurrentPath();
          },
        })}
      >
        <Stack className="">
          <FormInput
            name={n("title")}
            className="mx-1 mb-2"
            placeholder="Go for a walk"
            noFormMessage={Object.keys(form.formState.dirtyFields).length === 0}
          />
          <Collapsible
            defaultOpen={false}
            open={Object.keys(form.formState.dirtyFields).length > 0}
          >
            <CollapsibleContent>
              <Stack gap="form" className="m-1">
                <FormTextarea
                  name={n("description")}
                  TextAreaProps={{ rows: 4, className: "min-w-full" }}
                  placeholder="Description (Optional)"
                />
                <FormSubmit />
              </Stack>
            </CollapsibleContent>
          </Collapsible>
        </Stack>
      </form>
    </Form>
  );
}
