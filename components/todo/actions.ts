"use server";
import { serverAction } from "@/app/auth/register/server-action";
import { api } from "@/services/api";

export const todoCreateAction = serverAction(api.todo.create);
export const todoRemoveAction = serverAction(api.todo.remove);
export const todoCompleteAction = serverAction(api.todo.toggleComplete);
