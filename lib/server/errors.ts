import { NoResultError } from "kysely";
import { DatabaseError } from "pg";
import { AppError, HttpStatusCode } from "../app-error";
import { errMsgFactory } from "./message-factory";

// Kysely error handling logic
export function kyselyAppError(
  e: unknown,
  cbOrResourceName:
    | string
    | ((e: DatabaseError) => { message: string; status: HttpStatusCode }),
  errMsgFactoryMethod?: keyof typeof errMsgFactory,
  statusArg?: HttpStatusCode,
) {
  let msg = "Something went wrong";
  let status: HttpStatusCode = "INTERNAL_SERVER_ERROR";

  if (typeof cbOrResourceName === "function") {
    if (e instanceof DatabaseError) {
      const dbErrCb = cbOrResourceName(e);
      msg = dbErrCb.message;
      status = dbErrCb.status;
    }
  } else {
    const resourceName = cbOrResourceName;
    if (e instanceof NoResultError) {
      msg = errMsgFactory.notFound(resourceName);
      status = "NOT_FOUND";
    } else if (
      errMsgFactoryMethod &&
      ((method): method is keyof typeof errMsgFactory => {
        return method in errMsgFactory;
      })(errMsgFactoryMethod)
    ) {
      msg = errMsgFactory[errMsgFactoryMethod](resourceName);
    }

    if (e instanceof DatabaseError) {
      const dbErrCb = handleDbError(e, undefined, msg);
      msg = dbErrCb.message;
      status = dbErrCb.status;
    }
  }

  return new AppError({ message: msg, status: statusArg ?? status, error: e });
}

// Database error handling logic
export function handleDbError(
  error: DatabaseError,
  customMessage?: {
    "23505"?: string;
    "23503"?: string;
    "23502"?: string;
    "22P02"?: string;
    "22003"?: string;
    "22001"?: string;
  },
  defaultMessage = "Something went wrong",
) {
  let message = defaultMessage;
  let status: HttpStatusCode = "INTERNAL_SERVER_ERROR";

  const keys = getDbErrorKeys(error);

  switch (error.code) {
    case "23505":
      message =
        customMessage?.[23505] ??
        `Unique constraint violation: ${keys.join(", ")}`;
      status = "CONFLICT";
      break;
    case "23503":
      message =
        customMessage?.[23503] ?? `Foreign key violation: ${keys.join(", ")}`;
      status = "BAD_REQUEST";
      break;
    case "23502":
      message =
        customMessage?.[23502] ??
        `Not null constraint violation: ${keys.join(", ")}`;
      status = "BAD_REQUEST";
      break;
    case "22P02":
      message =
        customMessage?.["22P02"] ?? `Invalid input syntax: ${keys.join(", ")}`;
      status = "BAD_REQUEST";
      break;
    case "22003":
      message =
        customMessage?.[22003] ??
        `Numeric value out of range: ${keys.join(", ")}`;
      status = "BAD_REQUEST";
      break;
    case "22001":
      message =
        customMessage?.[22001] ??
        `String length out of range: ${keys.join(", ")}`;
      status = "BAD_REQUEST";
      break;
  }

  return {
    message,
    status,
  };
}

// Utility to get error keys
export function getDbErrorKeys(error: DatabaseError) {
  const keys = error.detail?.match(/\((.+)\)=/)?.[1]?.split(", ") ?? [];

  keys.forEach((key, i) => {
    keys[i] = key
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  });

  return keys;
}
