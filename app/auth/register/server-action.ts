export function serverAction<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>
) {
  return async (...args: TArgs) => {
    return fn(...args);
  };
}
