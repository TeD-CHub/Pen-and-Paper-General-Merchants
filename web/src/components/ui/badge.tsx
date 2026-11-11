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
  primary: "bg-purple-100 text-purple-900 border border-purple-200",
  accent: "bg-primary text-white",
  neutral: "bg-purple-50 text-purple-800 border border-purple-200",
  success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border border-amber-200",
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
