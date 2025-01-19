import { getSession } from "@/services/auth/next-auth";
import { z } from "@hono/zod-openapi";
import { AppError } from "../app-error";

export function validateSchema<TSchemaOutput, TSchemaInput>(
  schema: z.ZodSchema<TSchemaOutput, any, TSchemaInput>,
  dto: z.input<typeof schema>,
) {
  const valid = schema.safeParse(dto);
  if (valid.error) {
    throw new AppError({ error: valid.error });
  }

  return valid.data;
}
export async function validateUserSession() {
  const session = await getSession();

  if (!session) {
    throw new AppError({ status: "UNAUTHORIZED", message: "Unauthorized" });
  }
  return session.user;
}
