import React, { useState } from "react";
import { useDebounce } from "../hooks/use-debounce";
import type { InputProps } from "../ui/input";
import { Input } from "../ui/input";

export type InputDebouncedProps = {
  debounceTime?: number;
  onChange: (value: string) => void;
} & Omit<InputProps, "onChange">;

export function InputDebounced({
  debounceTime = 300,
  value,
  onChange,
  ...props
}: InputDebouncedProps) {
  const [localValue, setLocalValue] = useState(String(value ?? ""));
  const debouncedValue = useDebounce(localValue, debounceTime);

  // Trigger the parent onChange only when the debounced value changes
  React.useEffect(() => {
    if (onChange && debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value); // Update local state for immediate input response
  };

  return <Input value={localValue} onChange={handleChange} {...props} />;
}
