import { getSession } from "@/services/auth/next-auth";
import { z } from "zod";
import { AppError } from "./errors";

export function validateSchema<TSchemaOutput, TSchemaInput>(
  schema: z.ZodSchema<TSchemaOutput, any, TSchemaInput>,
  dto: z.input<typeof schema>,
) {
  const valid = schema.safeParse(dto);
  if (valid.error) {
    throw new AppError("Validation Error", "BAD_REQUEST", valid.error);
  }

  return valid.data;
}
export async function validateUserSession() {
  const session = await getSession();

  if (!session) {
    throw new AppError("Unauthorized", "UNAUTHORIZED");
  }
  return session.user;
}
