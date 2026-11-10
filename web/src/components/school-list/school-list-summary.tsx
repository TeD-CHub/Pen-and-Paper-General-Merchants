import { ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SchoolList } from "@/types";

interface SchoolListSummaryProps {
  schoolList: SchoolList;
  schoolName: string;
  itemCount: number;
}

export function SchoolListSummary({
  schoolList,
  schoolName,
  itemCount,
}: SchoolListSummaryProps) {
  return (
    <section
      id="sample-school-list"
      aria-labelledby="sample-school-list-title"
      className="rounded-2xl border border-primary/15 bg-white p-5 shadow-card sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-primary-light p-3 text-primary">
          <ClipboardList aria-hidden="true" size={24} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="sample-school-list-title"
              className="font-heading text-lg font-extrabold text-neutral-900"
            >
              Sample school list
            </h2>
            <Badge tone="accent">DEMO ONLY</Badge>
          </div>
          <p className="mt-1 text-base text-neutral-700">
            {schoolName} · {schoolList.grade}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {itemCount} sample items · Not an official school list
          </p>
        </div>
      </div>
    </section>
  );
}
