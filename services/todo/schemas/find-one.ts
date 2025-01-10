import { z } from "@hono/zod-openapi";
export const todoFindOneParamSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "01b4e7f1-835c-421c-9fac-e4e6538ec7c7",
  }),
});
export type TodoFindOneParamSchema = z.infer<typeof todoFindOneParamSchema>;
export const todoFindOneResponseSchema = z
  .object({
    id: z.string().openapi({
      example: "123",
    }),
    title: z.string().openapi({
      example: "Go for a walk",
    }),
    description: z.string().nullable().openapi({
      example: "Go for a walk in the park then buy milk from the store.",
    }),
    completed: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .openapi("Todo");
