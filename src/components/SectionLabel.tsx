import { getCategoryMeta } from "@/lib/categories";

interface SectionLabelProps {
  category?: string;
  location?: string;
  className?: string;
  tone?: "ink" | "light";
}

export default function SectionLabel({ category, location, className, tone = "ink" }: SectionLabelProps) {
  const meta = getCategoryMeta(category);
  if (!meta) return null;

  const toneClass = tone === "light" ? "text-amber" : "text-copper";

  return (
    <p className={`mono-label flex flex-wrap items-center gap-2 text-[11px] ${toneClass} ${className ?? ""}`}>
      <span>{meta.label}</span>
      {location ? (
        <>
          <span aria-hidden="true" className="opacity-50">
            /
          </span>
          <span className={tone === "light" ? "text-frost/70 normal-case tracking-normal" : "text-ink-soft normal-case tracking-normal"}>
            {location}
          </span>
        </>
      ) : null}
    </p>
  );
}
