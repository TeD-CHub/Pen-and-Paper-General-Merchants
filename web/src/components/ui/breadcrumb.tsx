// Usage: <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Books" }]} />
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-h-11 items-center gap-1">
              {index > 0 ? <ChevronRight aria-hidden="true" size={16} className="text-neutral-500" /> : null}
              {current || !item.href ? (
                <span aria-current={current ? "page" : undefined} className="px-1 font-semibold text-neutral-900">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="rounded px-1 text-primary underline-offset-2 hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
