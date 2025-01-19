import { paginationSchema } from "@/services/shared/schemas/pagination";
import { z } from "@hono/zod-openapi";
export const todoStatusEnum = ["all", "completed"] as const;
export const todoFindManyParamSchema = paginationSchema.extend({
  search: z.string().nullable(),
  status: z.enum(todoStatusEnum),
});
