import { z } from "@hono/zod-openapi";
// Define HTTP status codes
export const HttpStatusCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatusCode = keyof typeof HttpStatusCodes;
// Unified AppError class for handling errors
export class AppError extends Error {
  public readonly statusCode: (typeof HttpStatusCodes)[keyof typeof HttpStatusCodes];
  public readonly validationErrors?: Record<string, string>;

  constructor({
    message,
    status = "BAD_REQUEST",
    error,
    validationErrors,
  }: {
    message?: string;
    status?: HttpStatusCode;
    error?: Error | unknown;
    validationErrors?: Record<string, string>;
  }) {
    super();
    if (validationErrors) {
      this.validationErrors = validationErrors;
    }
    if (message) {
      this.message = message;
    }
    this.statusCode = HttpStatusCodes[status];
    if (error) {
      if (error instanceof z.ZodError) {
        this.validationErrors = formatZodErrors(error.issues);
        console.error(error.errors);
      } else {
        console.error(error);
      }
    }

    Error.captureStackTrace(this, AppError);
  }
}
function formatZodErrors(issues: z.ZodIssue[]) {
  return issues.reduce(
    (acc, issue) => {
      const key = issue.path.join(".");
      acc[key] = issue.message;
      return acc;
    },
    {} as Record<string, string>,
  );
}
