// Usage: <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination">
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Go to previous page"
            className="grid size-11 place-items-center rounded-lg text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
        </li>
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === page ? "page" : undefined}
              className={`grid size-11 place-items-center rounded-lg font-semibold ${
                pageNumber === page
                  ? "bg-primary text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
            aria-label="Go to next page"
            className="grid size-11 place-items-center rounded-lg text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
