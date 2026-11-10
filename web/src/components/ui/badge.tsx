// Usage: <Badge status="in-stock" /> or <Badge tone="primary">Sample</Badge>
import type { ReactNode } from "react";
import clsx from "clsx";

export type StockBadgeStatus = "in-stock" | "low-stock" | "out-of-stock" | "sale";
type BadgeTone = "primary" | "accent" | "neutral" | "success" | "warning";

interface BadgeProps {
  children?: ReactNode;
  status?: StockBadgeStatus;
  tone?: BadgeTone;
}

const statusDetails: Record<StockBadgeStatus, { label: string; tone: BadgeTone }> = {
  "in-stock": { label: "In stock", tone: "success" },
  "low-stock": { label: "Low stock", tone: "warning" },
  "out-of-stock": { label: "Out of stock", tone: "neutral" },
  sale: { label: "Sale", tone: "warning" },
};

const toneClasses: Record<BadgeTone, string> = {
  primary: "bg-primary-light text-primary-dark",
  accent: "bg-lilac-100 text-lilac-900",
  neutral: "bg-neutral-100 text-neutral-700",
  success: "bg-teal-100 text-success",
  warning: "bg-coral-100 text-warning",
};

export function Badge({ children, status, tone = "neutral" }: BadgeProps) {
  const resolvedTone = status ? statusDetails[status].tone : tone;
  const content = children ?? (status ? statusDetails[status].label : null);

  return (
    <span
      className={clsx(
        "inline-flex min-h-7 items-center rounded-full px-3 py-1 text-xs font-bold",
        toneClasses[resolvedTone],
      )}
    >
      {content}
    </span>
  );
}
