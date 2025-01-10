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

  React.useEffect(() => {
    if (onChange && debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
  };

  return <Input value={localValue} onChange={handleChange} {...props} />;
}
