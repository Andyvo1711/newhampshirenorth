import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationResult } from "@/lib/pagination";

interface PaginationProps<T> {
  result: PaginationResult<T>;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

function buildHref(basePath: string, page: number, searchParams?: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value) params.set(key, value);
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export default function Pagination<T>({ result, basePath, searchParams }: PaginationProps<T>) {
  if (result.totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: result.totalPages }, (_, i) => i + 1).filter((page) => {
    return page === 1 || page === result.totalPages || Math.abs(page - result.currentPage) <= 1;
  });

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between gap-4 border-t border-line-light pt-6">
      {result.hasPrevious ? (
        <Link
          href={buildHref(basePath, result.currentPage - 1, searchParams)}
          className="flex items-center gap-1 font-sans text-sm font-semibold text-copper transition hover:text-ink"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Previous
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      <ul className="hidden items-center gap-1 sm:flex">
        {pageNumbers.map((page, index) => {
          const previous = pageNumbers[index - 1];
          const showEllipsis = previous !== undefined && page - previous > 1;
          return (
            <li key={page} className="flex items-center gap-1">
              {showEllipsis ? <span className="px-1 text-ink-soft">&hellip;</span> : null}
              <Link
                href={buildHref(basePath, page, searchParams)}
                aria-current={page === result.currentPage ? "page" : undefined}
                className={`flex h-8 w-8 items-center justify-center font-sans text-sm ${
                  page === result.currentPage ? "bg-ink text-snow" : "text-ink-soft hover:text-copper"
                }`}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ul>

      <span className="font-sans text-xs text-ink-soft sm:hidden">
        Page {result.currentPage} of {result.totalPages}
      </span>

      {result.hasNext ? (
        <Link
          href={buildHref(basePath, result.currentPage + 1, searchParams)}
          className="flex items-center gap-1 font-sans text-sm font-semibold text-copper transition hover:text-ink"
        >
          Next
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
