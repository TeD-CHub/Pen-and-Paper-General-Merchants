// Usage: <Select id="grade" label="Grade" options={[{ value: "1", label: "Grade 1" }]} />
import type { SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export function Select({
  id,
  label,
  options,
  placeholder,
  error,
  className,
  ...props
}: SelectProps) {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="font-semibold text-neutral-900">
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          className={clsx(
            "min-h-11 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 py-2 pr-10 text-base text-neutral-900",
            "focus-visible:border-primary aria-[invalid=true]:border-error",
            className,
          )}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
          size={18}
        />
      </div>
      {error ? <p id={errorId} className="text-sm text-error">{error}</p> : null}
    </div>
  );
}
