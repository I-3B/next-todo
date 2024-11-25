import { Button } from "@/components/ui/button";
import type { CalendarProps } from "@/components/ui/calendar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatters } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import React from "react";

export type DatePickerProps = {
  placeholder?: string;
  value: Date;
  onChange: (date: Date | undefined) => void;
  CalenderProps?: Omit<CalendarProps, "selected" | "onSelect" | "onChange" | "mode">;
  showMonthsDropdown?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "onChange" | "value">;
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(function FC(
  { value, onChange, placeholder, showMonthsDropdown, CalenderProps, ...props },
  ref
) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          {...props}
          className={cn(
            "justify-between text-left font-normal w-full",
            !value && "text-muted-foreground",
            props.className
          )}
        >
          {value ? formatters.date(value, "date") : <span>{placeholder ?? "Pick a date"}</span>}
          <CalendarIcon className="ms-2 size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" ref={ref}>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          {...(showMonthsDropdown && {
            captionLayout: "dropdown-buttons",
            fromYear: 1900,
            toYear: new Date().getFullYear(),
          })}
          {...CalenderProps}
        />
      </PopoverContent>
    </Popover>
  );
});
