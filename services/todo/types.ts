import type { todo } from ".";

export type TodoFindManyItem = Awaited<
  ReturnType<typeof todo.findMany>
>["data"][number];
