import { kyselyAppError } from "@/lib/server/errors";
import { validateSchema, validateUserSession } from "@/lib/server/utils";
import { z } from "zod";
import { db } from "../db";
import { todoCreateSchema } from "./schemas/create";
import { todoFindManyQuerySchema } from "./schemas/find-many";
import { todoToggleCompleteSchema } from "./schemas/toggle-complete";

export const todo = {
  create: async (data: z.infer<typeof todoCreateSchema>) => {
    const user = await validateUserSession();
    const dto = validateSchema(todoCreateSchema, data);
    const newTodo = await db
      .insertInto("todo")
      .values({
        user_id: user.id,
        title: dto.title,
        description: dto.description,
        completed: false,
      })
      .returningAll()
      .executeTakeFirstOrThrow()
      .catch((e) => {
        throw kyselyAppError(e, "todo", "create");
      });

    return newTodo;
  },

  findMany: async (searchParams: z.input<typeof todoFindManyQuerySchema>) => {
    const dto = validateSchema(todoFindManyQuerySchema, searchParams);
    const query = db
      .selectFrom("todo")
      .where("deleted_at", "is", null)
      .$if(!!dto.search, (eb) =>
        eb.where((eb) =>
          eb.or([
            eb("title", "like", `%${dto.search}%`),
            eb("description", "like", `%${dto.search}%`),
          ]),
        ),
      )
      .$if(dto.status === "completed", (eb) =>
        eb.where("completed", "=", true),
      );

    const dataQuery = query
      .selectAll()
      .orderBy(["completed asc", "created_at desc"])
      .limit(dto.pageSize)
      .offset(dto.page * dto.pageSize)
      .execute()
      .catch((e) => {
        throw kyselyAppError(e, "todos", "get");
      });
    const countQuery = query
      .select((eb) => eb.fn.countAll<number>().as("count"))

      .executeTakeFirstOrThrow()
      .catch((e) => {
        throw kyselyAppError(e, "todos count", "get");
      });
    const [data, { count }] = await Promise.all([dataQuery, countQuery]);
    return { data, count };
  },
  toggleComplete: async (data: z.infer<typeof todoToggleCompleteSchema>) => {
    return db
      .updateTable("todo")
      .set({
        completed: data.complete,
        updated_at: new Date().toISOString(),
      })
      .where("id", "=", data.id)
      .returning(["id"])
      .executeTakeFirstOrThrow()
      .catch((e) => {
        throw kyselyAppError(e, "todo complete", "custom");
      });
  },
  remove: async (id: string) => {
    return await db
      .updateTable("todo")
      .set({ deleted_at: new Date() })
      .where("id", "=", id)
      .returning("id")
      .executeTakeFirstOrThrow();
  },
};
