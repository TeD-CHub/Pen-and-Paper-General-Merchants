// Usage: <Alert variant="warning" title="Sample data">Confirm details before ordering.</Alert>
import type { ReactNode } from "react";
import clsx from "clsx";
import { AlertCircle, CircleCheck, Info, TriangleAlert } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  children: ReactNode;
}

const styles: Record<AlertVariant, string> = {
  info: "border-primary bg-primary-light text-primary-dark",
  success: "border-success bg-teal-50 text-success",
  warning: "border-warning bg-coral-100 text-warning",
  error: "border-error bg-error-light text-error",
};

const icons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: AlertCircle,
};

export function Alert({ variant = "info", title, children }: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={clsx("flex items-start gap-3 rounded-xl border p-4", styles[variant])}
    >
      <Icon aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
      <div>
        <h3 className="font-bold">{title}</h3>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
