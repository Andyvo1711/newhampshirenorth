import { formatDate } from "@/lib/dates";

function safeEditionLine(): string {
  try {
    const now = new Date();
    const formatted = formatDate(now.toISOString());
    return formatted === "Date unavailable" ? "" : formatted.toUpperCase();
  } catch {
    return "";
  }
}

export default function Northline() {
  const dateLabel = safeEditionLine();

  return (
    <div className="border-b border-line-dark bg-night">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <p className="mono-label whitespace-nowrap text-[11px] text-frost/70">
          43.2° N
          <span className="mx-2 text-copper opacity-70">/</span>
          CONCORD
          {dateLabel ? (
            <>
              <span className="mx-2 text-copper opacity-70">/</span>
              {dateLabel}
            </>
          ) : null}
          <span className="mx-2 text-copper opacity-70">/</span>
          EDITION 001
        </p>
      </div>
    </div>
  );
}
