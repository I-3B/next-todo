import { api } from "@/services/api";
import {
  todoFindOneParamSchema,
  todoFindOneResponseSchema,
} from "@/services/todo/schemas/find-one";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

export const todoAPI = new OpenAPIHono().openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    request: { params: todoFindOneParamSchema },
    responses: {
      200: {
        description: "Todo details",
        content: {
          "application/json": { schema: todoFindOneResponseSchema },
        },
      },
    },
  }),
  async (c) => c.json(await api.todo.findOne(c.req.valid("param"))),
);
