import { z } from "zod";
import { AppError } from "./errors";

export function validateSchema(schema: z.ZodSchema<any>, dto: z.infer<typeof schema>) {
  const valid = schema.safeParse(dto);
  if (valid.error) {
    throw new AppError("Validation Error", "BAD_REQUEST", valid.error);
  }

  return valid.data;
}
