import { kyselyAppError } from "@/lib/server/errors";
import { validateUserSession } from "@/lib/server/utils";
import { db } from "../db";

export const user = {
  profile: async () => {
    const session = await validateUserSession();
    const user = await db
      .selectFrom("user")
      .select(["id", "email", "created_at"])
      .where("id", "=", session.id)
      .executeTakeFirstOrThrow((e) => {
        throw kyselyAppError(e, "user", "get");
      });
    return user;
  },
};
