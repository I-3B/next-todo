import { AppError } from "@/lib/app-error";
import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AppError;
  }
}
