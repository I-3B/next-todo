"use server";
import { api } from "@/services/api";
import { serverAction } from "./server-action";

export default serverAction(api.auth.register);
