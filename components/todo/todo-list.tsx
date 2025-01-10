import { api } from "@/services/api";
import { todoFindManyQuerySchema } from "@/services/todo/schemas/find-many";
import { z } from "@hono/zod-openapi";
import { PaginationButtons } from "../ui/pagination-buttons";
import { Stack } from "../ui/stack";
import { TodoItem } from "./todo-item";

export type TodoListProps = { filter: z.input<typeof todoFindManyQuerySchema> };
export async function TodoList({ filter }: TodoListProps) {
  const todos = await api.todo.findMany(filter);

  return (
    <Stack gap="list">
      {todos.data.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
      {todos.count == 0 && (
        <p className="my-10 text-center text-lg">No todos found</p>
      )}
      <PaginationButtons dataCount={todos.count} />
    </Stack>
  );
}
