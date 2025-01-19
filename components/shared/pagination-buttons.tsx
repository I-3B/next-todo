"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Route } from "next";
import { createSerializer, useQueryStates } from "nuqs";
import type { ReactNode } from "react";
import { useLocation } from "../hooks/use-location";
import { paginationParser } from "./pagination-search-params";

type PaginationVariant = "default" | "rounded" | "rounded-number";

export type PaginationButtonsProps = (
  | { totalPages: number; dataCount?: never }
  | { dataCount: number; totalPages?: never }
) & {
  sideButtonsAmounts?: number;
  nextIcon?: ReactNode;
  prevIcon?: ReactNode;
  variant?: PaginationVariant;
  disableNav?: boolean;
};
/**
 * Creates an array of page numbers surrounding the current page within the specified side button limits.
 *
 * The function calculates the range of page numbers to display in a pagination component based on the current page number,
 * the total number of pages, and the desired number of side buttons on each side of the current page.
 * It ensures that the range does not exceed the boundaries of available pages (1 to totalPages).
 *
 * @param {number} currentPageNumber - The current active page number.
 * @param {number} totalPages - The total number of pages available.
 * @param {number} sideButtonsLimit - The number of additional buttons to display on each side of the current page.
 * @returns {number[]} - An array of page numbers for pagination, centered around the current page within the limits.
 *
 * @example
 * // When the current page is 1 and the sideButtonsLimit is 2:
 * // Returns [1, 2, 3]
 * createArrayFromStartToEnd(1, 10, 2);
 *
 * @example
 * // When the current page is 2 and the sideButtonsLimit is 2:
 * // Returns [1, 2, 3, 4]
 * createArrayFromStartToEnd(2nt hover:bg-accent-2, 10, 2);
 *
 * @example
 * // When the current page is 3 and the sideButtonsLimit is 2:
 * // Returns [1, 2, 3, 4, 5]
 * createArrayFromStartToEnd(3, 10, 2);
 */
function createArrayFromStartToEnd(
  currentPageNumber: number,
  totalPages: number,
  sideButtonsLimit: number,
): number[] {
  const startIndex =
    currentPageNumber - sideButtonsLimit <= 0
      ? 1
      : currentPageNumber - sideButtonsLimit;
  const endIndex =
    currentPageNumber + sideButtonsLimit >= totalPages
      ? totalPages
      : currentPageNumber + sideButtonsLimit;
  const paginationButtons = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, index) => startIndex + index,
  );
  return paginationButtons.filter((p) => ![1, totalPages].includes(p));
}
const serializer = createSerializer(paginationParser);
export function PaginationButtons({
  totalPages,
  dataCount,
  sideButtonsAmounts,
  nextIcon,
  prevIcon,
  variant = "default",
  disableNav,
}: PaginationButtonsProps) {
  const sideButtonsLimit = sideButtonsAmounts ?? 2;
  const [{ page, pageSize }, setCurrentPage] = useQueryStates(
    paginationParser,
    {
      shallow: false,
      clearOnDefault: true,
    },
  );
  totalPages ??= Math.ceil((dataCount ?? 0) / pageSize);
  const paginationButtons = createArrayFromStartToEnd(
    page,
    totalPages,
    sideButtonsLimit,
  );
  const location = useLocation();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        {!disableNav && (
          <PaginationItem
            className={`${page <= 1 ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {prevIcon ? (
              <PaginationPrevious
                href={serializer(location, { page: page - 1 }) as Route}
                isActive={page !== 1}
              >
                {prevIcon}
              </PaginationPrevious>
            ) : (
              <PaginationPrevious
                href={serializer(location, { page: page - 1 }) as Route}
              />
            )}
          </PaginationItem>
        )}

        <PaginationItem
          onClick={() => setCurrentPage({ page: 1 })}
          className="cursor-pointer"
        >
          <PaginationLink
            isActive={page === 1}
            href={serializer(location, { page: 1 }) as Route}
          >
            {variant !== "rounded" && 1}
          </PaginationLink>
        </PaginationItem>
        {/* ... Left Side */}
        {page - sideButtonsLimit >= sideButtonsLimit && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Numbered Button */}
        {paginationButtons.map((pageNumber, index) => (
          <PaginationItem key={index} className="cursor-pointer">
            <PaginationLink
              isActive={page === pageNumber}
              href={serializer(location, { page: pageNumber }) as Route}
            >
              {variant !== "rounded" && pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* ... Right Side */}
        {sideButtonsLimit + page < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPages !== 1 && totalPages !== 0 && (
          <PaginationItem
            onClick={() => setCurrentPage({ page: totalPages })}
            className="cursor-pointer"
          >
            <PaginationLink
              isActive={page === totalPages}
              href={serializer(location, { page: totalPages }) as Route}
            >
              {variant !== "rounded" && totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        {!disableNav && (
          <PaginationItem
            className={`${page >= totalPages ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {nextIcon ? (
              <PaginationNext
                href={serializer(location, { page: page + 1 }) as Route}
                isActive={page === totalPages}
              >
                {nextIcon}
              </PaginationNext>
            ) : (
              <PaginationNext
                href={serializer(location, { page: page + 1 }) as Route}
              />
            )}
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
