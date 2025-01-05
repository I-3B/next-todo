import type { PageProps } from "@/types/next";
import { createSearchParamsCache, parseAsInteger } from "nuqs/server";

export const paginationParser = {
  page: parseAsInteger
    .withDefault(1)
    .withOptions({ shallow: false, clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(4)
    .withOptions({ shallow: false, clearOnDefault: true }),
};

export const paginationParserCache = createSearchParamsCache(paginationParser);
export function getPagination(
  searchParams: Awaited<PageProps["searchParams"]>,
) {
  paginationParserCache.parse(searchParams);
  return {
    page: paginationParserCache.get("page"),
    pageSize: paginationParserCache.get("pageSize"),
  };
}
