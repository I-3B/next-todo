"use client";
import { revalidateCurrentPath } from "@/lib/client/next-cache-client";
import { cn } from "@/lib/utils";
import { TodoFindManyItem } from "@/services/todo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Check, CircleCheckBig, RotateCcw, Trash, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  Inplace,
  InplaceClose,
  InplaceContent,
  InplaceDisplay,
} from "../ui/in-place";
import { todoCompleteAction, todoRemoveAction } from "./actions";
import { todoQueries } from "./queries";
import { TodoDetails } from "./todo-details";
export type TodoItemProps = { todo: TodoFindManyItem };
export function TodoItem({ todo }: TodoItemProps) {
  const remove = useMutation({ mutationFn: todoRemoveAction });
  const complete = useMutation({ mutationFn: todoCompleteAction });
  const queryClient = useQueryClient();
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card className="p-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className={cn(todo.completed && "line-through")}>
              {todo.title}
            </CardTitle>
            <p
              className="ms-auto text-xs text-muted-foreground"
              suppressHydrationWarning
            >
              {dayjs(todo.createdAt).format("YY/MM/DD hh:mm A")}
            </p>
          </CardHeader>
          <CardContent>
            <p className="truncate">{todo.description}</p>
          </CardContent>
          <CardFooter className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              isLoading={complete.isPending}
              onClick={() => {
                complete.mutate(
                  { id: todo.id, complete: !todo.completed },
                  {
                    onSuccess: () => {
                      toast.success("Marked Todo as complete");
                      revalidateCurrentPath();
                      queryClient.invalidateQueries(
                        todoQueries.details({ id: todo.id }),
                      );
                    },
                  },
                );
              }}
            >
              {todo.completed ? (
                <RotateCcw className="text-primary" />
              ) : (
                <CircleCheckBig className="text-success" />
              )}
            </Button>

            <Inplace>
              <InplaceDisplay>
                <Button variant="outline" size="icon">
                  <Trash className="text-destructive" />
                </Button>
              </InplaceDisplay>
              <InplaceContent>
                <Button
                  variant="outline"
                  size="icon"
                  isLoading={remove.isPending}
                  onClick={() => {
                    remove.mutate(todo.id, {
                      onSuccess: () => {
                        toast.success("Todo removed successfully");
                        revalidateCurrentPath();
                        queryClient.invalidateQueries(
                          todoQueries.details({ id: todo.id }),
                        );
                      },
                    });
                  }}
                >
                  <Check className="text-destructive" />
                </Button>
              </InplaceContent>
              <InplaceClose>
                <Button variant="outline" size="icon">
                  <X />
                </Button>
              </InplaceClose>
            </Inplace>
          </CardFooter>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-[90vw] max-w-sm">
        <TodoDetails id={todo.id} />
      </HoverCardContent>
    </HoverCard>
  );
}
