import { qw } from "@/lib/query-wrapper";
import { rpc } from "@/services/rpc";
import { TodoFindOneParamSchema } from "@/services/todo/schemas/find-one";
import { queryOptions } from "@tanstack/react-query";

export const todoQueries = {
  rootKey: () => ["todo"],

  detailsKey: () => [todoQueries.rootKey(), "details"],
  details: (param: TodoFindOneParamSchema) =>
    queryOptions({
      queryKey: [...todoQueries.detailsKey(), param],
      queryFn: () => qw(rpc.todos[":id"].$get)({ param }),
    }),
};
