// Usage: <EmptyState title="No products found" description="Try another search." />
import type { ReactNode } from "react";
import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="grid justify-items-center gap-3 rounded-xl border border-dashed border-neutral-200 bg-white px-5 py-8 text-center">
      <PackageSearch aria-hidden="true" size={32} className="text-primary" />
      <h2 className="font-heading text-lg font-bold text-neutral-900">{title}</h2>
      <p className="max-w-md text-neutral-700">{description}</p>
      {action}
    </div>
  );
}
