import { AppError } from "@/lib/server/errors";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { handle } from "hono/vercel";
import { todoAPI } from "./todo";

const app = new OpenAPIHono().basePath("/api");
app.get("/ui", swaggerUI({ url: "/api/doc" }));
const honoApi = app.route("/todos", todoAPI);

app.onError((error, c) => {
  if (error instanceof AppError) {
    return c.json(error, { status: error.statusCode });
  }
  return c.json({ error: error.message }, { status: 500 });
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});
export const GET = handle(app);
export const POST = handle(app);
export type AppType = typeof honoApi;
