"use server";
import { serverAction } from "@/lib/server-action";
import { api } from "@/services/api";

export default serverAction(api.auth.register);
