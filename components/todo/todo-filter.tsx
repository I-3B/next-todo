"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CheckCircle, Filter, Search, X } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Button } from "../ui/button";
import { InputDebounced } from "../ui/input-debounced";
import { todoParser } from "./search-params";

export type TodoFilterProps = {};
export function TodoFilter({}: TodoFilterProps) {
  const [filter, setFilter] = useQueryStates(todoParser);

  return (
    <Collapsible className="mb-1 flex flex-col [&[data-state=open]_.filters]:hidden">
      <div className="flex justify-between">
        <div className="filters flex gap-1">
          {filter.search && (
            <Button
              variant="outline"
              className="gap-1 rounded-xl px-2"
              size="sm"
              onClick={() => setFilter((filter) => ({ ...filter, search: "" }))}
            >
              <Search className="size-3" /> {filter.search}{" "}
              <X className="size-3" />
            </Button>
          )}
          {filter.status === "completed" && (
            <Button
              variant="outline"
              className="gap-1 rounded-xl px-2"
              size="sm"
              onClick={() =>
                setFilter((filter) => ({ ...filter, status: "all" }))
              }
            >
              <CheckCircle className="size-3" /> Completed{" "}
              <X className="size-3" />
            </Button>
          )}
        </div>
        <CollapsibleTrigger asChild>
          <Button
            className="m-1 ms-auto data-[state=open]:bg-primary"
            variant="ghost"
            size="icon"
          >
            <Filter />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="flex gap-1 p-1">
          <InputDebounced
            aria-placeholder="Search..."
            value={filter.search}
            className="flex-1"
            onChange={(search) => {
              setFilter(({ status }) => ({ status, search, page: 1 }));
            }}
            placeholder="Search"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              setFilter(({ search, status }) => ({
                status: status === "all" ? "completed" : "all",
                search,
                page: 1,
              }));
            }}
          >
            {filter.status === "all" && <CheckCircle />}
            {filter.status === "completed" && (
              <CheckCircle className="text-success" />
            )}
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
