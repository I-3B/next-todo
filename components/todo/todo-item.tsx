"use client";
import { revalidateCurrentPath } from "@/lib/client/next-cache-client";
import { cn } from "@/lib/utils";
import { TodoFindManyItem } from "@/services/todo/types";
import { useMutation } from "@tanstack/react-query";
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
  Inplace,
  InplaceClose,
  InplaceContent,
  InplaceDisplay,
} from "../ui/in-place";
import { todoCompleteAction, todoRemoveAction } from "./actions";
export type TodoItemProps = { todo: TodoFindManyItem };
export function TodoItem({ todo }: TodoItemProps) {
  const remove = useMutation({ mutationFn: todoRemoveAction });
  const complete = useMutation({ mutationFn: todoCompleteAction });
  return (
    <Card className="p-2">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className={cn(todo.completed && "line-through")}>
          {todo.title}
        </CardTitle>
        <p
          className="ms-auto text-xs text-muted-foreground"
          suppressHydrationWarning
        >
          {dayjs(todo.updated_at || todo.created_at).format("YY/MM/DD hh:mm")}
        </p>
      </CardHeader>
      <CardContent>
        <p>{todo.description}</p>
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
  );
}
