export const DEFAULT_PAGE_SIZE = 12;

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function parsePageParam(value: unknown): number {
  const parsed = typeof value === "string" ? parseInt(value, 10) : Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export function paginate<T>(
  items: T[],
  page: unknown,
  pageSize: number = DEFAULT_PAGE_SIZE
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const requestedPage = parsePageParam(page);
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
