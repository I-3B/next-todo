import { todoStatusEnum } from "@/services/todo/schemas/find-many";
import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { paginationParser } from "../shared/pagination-search-params";

export const todoParser = {
  ...paginationParser,
  status: parseAsStringLiteral(todoStatusEnum)
    .withDefault("all")
    .withOptions({ shallow: false, clearOnDefault: true }),
  search: parseAsString
    .withDefault("")
    .withOptions({ shallow: false, clearOnDefault: true }),
};
export const todoParserCache = createSearchParamsCache(todoParser);
