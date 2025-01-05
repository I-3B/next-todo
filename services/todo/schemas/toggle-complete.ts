import { z } from "zod";

export const todoToggleCompleteSchema = z.object({
  id: z.string(),
  complete: z.boolean(),
});
