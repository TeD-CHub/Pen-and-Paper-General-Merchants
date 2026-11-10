// Usage: <Accordion items={[{ id: "shipping", title: "Shipping", content: "..." }]} />
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  return (
    <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
      {items.map((item) => (
        <details key={item.id} name={allowMultiple ? undefined : "accordion-group"} className="group">
          <summary
            aria-controls={`${item.id}-panel`}
            className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-neutral-900 marker:hidden [&::-webkit-details-marker]:hidden"
          >
            {item.title}
            <ChevronDown
              aria-hidden="true"
              size={18}
              className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <div id={`${item.id}-panel`} className="px-4 pb-4 text-neutral-700">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
