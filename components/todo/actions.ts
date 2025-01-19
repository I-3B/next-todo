"use server";
import { serverAction } from "@/lib/server-action";
import { api } from "@/services/api";

export const todoCreateAction = serverAction(api.todo.create);
export const todoRemoveAction = serverAction(api.todo.remove);
export const todoCompleteAction = serverAction(api.todo.toggleComplete);
