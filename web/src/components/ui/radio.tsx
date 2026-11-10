// Usage: <Radio id="delivery" name="fulfilment" label="Delivery" value="delivery" />
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  name: string;
  label: string;
  description?: string;
}

export function Radio({ id, name, label, description, className, ...props }: RadioProps) {
  const descriptionId = `${id}-description`;

  return (
    <div className="flex items-start gap-3">
      <input
        {...props}
        id={id}
        name={name}
        type="radio"
        aria-describedby={description ? descriptionId : undefined}
        className={clsx("mt-1 size-5 shrink-0 accent-primary", className)}
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
