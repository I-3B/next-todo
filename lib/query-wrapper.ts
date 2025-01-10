import { ClientResponse } from "hono/client";

/** Query Wrapper
 * wrap hono queries and throw errors if they fail
 */
export function qw<
  TResponse,
  TStatusCode extends number,
  TFormat extends string,
  TParams extends any[],
>(
  queryFn: (
    ...params: TParams
  ) => Promise<ClientResponse<TResponse, TStatusCode, TFormat>>,
): (...params: TParams) => Promise<TResponse> {
  return (async (...params: TParams) => {
    const response = await queryFn(...params);
    if (!response.ok) {
      throw await response.json();
    }
    return response.json();
  }) as any;
}
