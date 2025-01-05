import { todoParserCache } from "@/components/todo/search-params";
import { TodoCreateForm } from "@/components/todo/todo-create-form";
import { TodoFilter } from "@/components/todo/todo-filter";
import { TodoList } from "@/components/todo/todo-list";
import { PageProps } from "@/types/next";

export default async function Page({ searchParams }: PageProps) {
  todoParserCache.parse(await searchParams);
  return (
    <div className="mx-auto mt-10 flex max-w-sm flex-col justify-center">
      <TodoCreateForm />
      <TodoFilter />
      <TodoList filter={todoParserCache.all()} />
    </div>
  );
}
