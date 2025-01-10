import { z } from "@hono/zod-openapi";

export const todoToggleCompleteSchema = z.object({
  id: z.string(),
  complete: z.boolean(),
});
