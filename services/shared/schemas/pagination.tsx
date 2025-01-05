import { z } from "zod";

export const paginationSchema = z.object({
  page: z
    .number()
    .min(1)
    .transform((p) => p - 1),
  pageSize: z.number().min(1),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;
