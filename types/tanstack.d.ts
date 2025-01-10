import { AppError } from "@/lib/server/errors";
import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AppError;
  }
}
