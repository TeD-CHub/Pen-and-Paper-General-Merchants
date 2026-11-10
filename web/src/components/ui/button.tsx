// Usage: <Button variant="primary">Browse products</Button>
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "border border-primary bg-white text-primary hover:bg-primary-light",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
  danger: "bg-error text-white hover:bg-red-800",
};

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-55",
        variants[variant],
        className,
      )}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="animate-spin" size={18} /> : null}
      {loading ? <span className="sr-only">Loading</span> : null}
      {children}
    </button>
  );
}
