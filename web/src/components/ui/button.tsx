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
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary: "border border-primary bg-white text-primary hover:bg-primary-light",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
  danger: "bg-coral-700 text-white hover:bg-coral-800",
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
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors disabled:!cursor-not-allowed disabled:!border-charcoal-500 disabled:!bg-charcoal-200 disabled:!text-charcoal-700 disabled:!opacity-100",
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
