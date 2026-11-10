// Usage: <Input id="email" label="Email address" type="email" />
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ id, label, error, hint, className, ...props }: InputProps) {
  const messageId = `${id}-message`;

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="font-semibold text-neutral-900">
        {label}
      </label>
      <input
        {...props}
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={clsx(
          "min-h-11 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 placeholder:text-neutral-500",
          "focus-visible:border-primary aria-[invalid=true]:border-error",
          className,
        )}
      />
      {error || hint ? (
        <p id={messageId} className={clsx("text-sm", error ? "text-error" : "text-neutral-500")}>
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}
