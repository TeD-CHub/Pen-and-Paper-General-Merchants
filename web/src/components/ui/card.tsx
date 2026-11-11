// Usage: <Card title="Delivery details"><p>Details go here.</p></Card>
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children, className, ...props }: CardProps) {
  return (
    <section
      {...props}
      className={clsx("rounded-xl border border-neutral-200 bg-white p-5 shadow-card", className)}
    >
      {title ? <h3 className="mb-3 font-heading text-lg font-bold text-neutral-900">{title}</h3> : null}
      {children}
    </section>
  );
}
