import { z } from "@hono/zod-openapi";
export const todoCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
});
