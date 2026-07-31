const DATE_UNAVAILABLE = "Date unavailable";

export function isValidDateString(value: unknown): value is string {
  if (typeof value !== "string" || value.trim() === "") return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp);
}

export function safeParseDate(value: unknown): Date | null {
  if (!isValidDateString(value)) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(value: unknown): string {
  const date = safeParseDate(value);
  if (!date) return DATE_UNAVAILABLE;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateShort(value: unknown): string {
  const date = safeParseDate(value);
  if (!date) return DATE_UNAVAILABLE;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateLine(value: unknown): string {
  const date = safeParseDate(value);
  if (!date) return DATE_UNAVAILABLE;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function toIsoDate(value: unknown): string | null {
  const date = safeParseDate(value);
  return date ? date.toISOString() : null;
}

export function compareByDateDesc<T extends { date: unknown }>(a: T, b: T): number {
  const aDate = safeParseDate(a.date);
  const bDate = safeParseDate(b.date);
  if (aDate && bDate) return bDate.getTime() - aDate.getTime();
  if (aDate && !bDate) return -1;
  if (!aDate && bDate) return 1;
  return 0;
}

export function sortArticlesByDate<T extends { date: unknown }>(articles: T[]): T[] {
  return [...articles].sort(compareByDateDesc);
}
