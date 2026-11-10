// Usage: <Checkbox id="updates" label="Send me school updates" />
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: string;
  description?: string;
}

export function Checkbox({ id, label, description, className, ...props }: CheckboxProps) {
  const descriptionId = `${id}-description`;

  return (
    <div className="flex items-start gap-3">
      <input
        {...props}
        id={id}
        type="checkbox"
        aria-describedby={description ? descriptionId : undefined}
        className={clsx(
          "mt-1 size-5 shrink-0 rounded border-neutral-300 accent-primary",
          className,
        )}
      />
      <div className="grid gap-0.5">
        <label htmlFor={id} className="cursor-pointer font-semibold text-neutral-900">
          {label}
        </label>
        {description ? (
          <p id={descriptionId} className="text-sm text-neutral-500">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
