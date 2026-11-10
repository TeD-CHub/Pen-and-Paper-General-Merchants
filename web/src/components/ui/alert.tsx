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
  info: "border-primary/20 bg-primary-light text-primary-dark",
  success: "border-success/20 bg-green-50 text-success",
  warning: "border-warning/20 bg-amber-50 text-warning",
  error: "border-error/20 bg-red-50 text-error",
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
