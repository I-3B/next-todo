import { kyselyAppError } from "@/lib/server/errors";
import { validateSchema, validateUserSession } from "@/lib/server/utils";
import { z } from "@hono/zod-openapi";
import { db } from "../db";
import { todoCreateSchema } from "./schemas/create";
import { todoFindManyQuerySchema } from "./schemas/find-many";
import { TodoFindOneParamSchema } from "./schemas/find-one";
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
  findOne: async (params: TodoFindOneParamSchema) => {
    const user = await validateUserSession();
    const todo = await db
      .selectFrom("todo")
      .where("id", "=", params.id)
      .where("user_id", "=", user.id)
      .where("deleted_at", "is", null)
      .select([
        "id",
        "title",
        "description",
        "completed",
        "created_at as createdAt",
        "updated_at as updatedAt",
      ])
      .executeTakeFirstOrThrow()
      .catch((e) => {
        throw kyselyAppError(e, "todo", "notFound");
      });
    return todo;
  },
  findMany: async (searchParams: z.input<typeof todoFindManyQuerySchema>) => {
    const user = await validateUserSession();
    const dto = validateSchema(todoFindManyQuerySchema, searchParams);
    const query = db
      .selectFrom("todo")
      .where("deleted_at", "is", null)
      .where("user_id", "=", user.id)
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
      .select([
        "id",
        "title",
        "description",
        "completed",
        "created_at as createdAt",
      ])
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
    const user = await validateUserSession();
    return db
      .updateTable("todo")
      .set({
        completed: data.complete,
        updated_at: new Date().toISOString(),
      })
      .where("id", "=", data.id)
      .where("user_id", "=", user.id)
      .returning(["id"])
      .executeTakeFirstOrThrow()
      .catch((e) => {
        throw kyselyAppError(e, "todo", "notFound");
      });
  },
  remove: async (id: string) => {
    const user = await validateUserSession();
    return await db
      .updateTable("todo")
      .set({ deleted_at: new Date() })
      .where("id", "=", id)
      .where("user_id", "=", user.id)
      .returning("id")
      .executeTakeFirstOrThrow()
      .catch((e) => {
        throw kyselyAppError(e, "todo", "notFound");
      });
  },
};
