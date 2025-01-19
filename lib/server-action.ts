import { AppError } from "./app-error";

export function serverAction<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
) {
  return async (...args: TArgs) => {
    try {
      const result = await fn(...args);
      return { result };
    } catch (error) {
      if (error instanceof AppError) {
        return { error: JSON.parse(JSON.stringify(error)) as AppError };
      }
      throw error;
    }
  };
}
export function mutationAction<TArgs extends any[], TReturn>(
  fn: (
    ...args: TArgs
  ) => Promise<
    | { result: TReturn; error: undefined }
    | { result: undefined; error: AppError }
  >,
) {
  return async (...args: TArgs) => {
    const result = await fn(...args);
    if (result.error) {
      throw result.error;
    }
    return result.result;
  };
}
