import * as React from "react";

import { cn } from "@/lib/utils";
import { DatePicker } from "../date-picker";
import { FormFieldItem, type FormFieldItemProps } from "./form-field-item";

export type FormDatePickerProps<C extends { [k: string]: any } = any> = {
  DatePickerProps?: Omit<
    React.ComponentPropsWithoutRef<typeof DatePicker>,
    "control" | "name" | "value" | "onChange"
  >;
} & Omit<FormFieldItemProps<C>, "children"> &
  Pick<React.ComponentPropsWithoutRef<typeof DatePicker>, "type" | "placeholder" | "disabled">;

const FormDatePicker = React.forwardRef<HTMLDivElement, FormDatePickerProps>(
  ({ inputClassName, DatePickerProps, type, placeholder, disabled, ...props }, ref) => {
    return (
      <FormFieldItem {...props} ref={ref}>
        {(field) => (
          <DatePicker
            {...field}
            {...{ type, placeholder, disabled }}
            {...DatePickerProps}
            className={cn(inputClassName, DatePickerProps?.className)}
          />
        )}
      </FormFieldItem>
    );
  }
);
FormDatePicker.displayName = "FormDatePicker";

export { FormDatePicker };
