import { AppError } from "@/lib/server/errors";
import { errMsgFactory } from "@/lib/server/message-factory";
import { validateSchema } from "@/lib/server/utils";
import { db } from "@/services/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import { AuthRegisterDto } from "./schemas/register";

export const auth = {
  validateUser: async (credentials: Record<"email" | "password", string>) => {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", credentials.email)
      .executeTakeFirst();

    if (!user) return null;
    const passwordMatch = bcrypt.compare(credentials.password, user.password);
    if (!passwordMatch) return null;
    return user;
  },
  register: async (credentials: z.infer<typeof AuthRegisterDto>) => {
    const dto = validateSchema(AuthRegisterDto, credentials);
    const existingUser = await db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", dto.email)
      .executeTakeFirst();
    if (existingUser) throw new AppError(errMsgFactory.exists("email"));
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const newUser = await db
      .insertInto("user")
      .values({
        email: credentials.email,
        password: hashedPassword,
      })
      .returningAll()
      .executeTakeFirst();
    return newUser;
  },
};
