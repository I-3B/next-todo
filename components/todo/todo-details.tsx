import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CheckCircle } from "lucide-react";
import { Loading } from "../ui/loading";
import { Stack } from "../ui/stack";
import { todoQueries } from "./queries";

export type TodoDetailsProps = { id: string };
export function TodoDetails({ id }: TodoDetailsProps) {
  const query = useQuery(todoQueries.details({ id }));

  return (
    <Stack gap="lg">
      {query.isLoading && <Loading className="mx-auto my-5" />}
      {query.isError && (
        <p className="text-center text-destructive">{query.error.message}</p>
      )}
      {query.isSuccess && (
        <>
          <h2 className="flex items-center gap-1 text-2xl font-bold">
            {query.data.title}{" "}
            {query.data.completed && <CheckCircle className="text-base" />}
          </h2>
          <p className="text-lg">{query.data.description}</p>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex gap-1">
              <span>Created at</span>
              <time dateTime={query.data.createdAt}>
                {dayjs(query.data.createdAt).format("YY/MM/DD hh:mm")}
              </time>
            </div>
            <div className="flex gap-1">
              <span>Last updated at</span>
              <time dateTime={query.data.updatedAt}>
                {dayjs(query.data.updatedAt).format("YY/MM/DD hh:mm")}
              </time>
            </div>
          </div>
        </>
      )}
    </Stack>
  );
}
