import Link from "next/link";
import type { Category } from "@/types/article";
import { getCategoryMeta } from "@/lib/categories";

interface NorthBreadcrumbProps {
  category: Category;
  className?: string;
}

export default function NorthBreadcrumb({ category, className }: NorthBreadcrumbProps) {
  const meta = getCategoryMeta(category);
  const segments = [
    { label: "North", href: "/" },
    { label: "New Hampshire", href: "/category/new-hampshire" },
  ];

  if (meta && meta.slug !== "new-hampshire") {
    segments.push({ label: meta.label, href: `/category/${meta.slug}` });
  }

  return (
    <nav aria-label="Breadcrumb" className={`mono-label flex flex-wrap items-center gap-2 text-[11px] ${className ?? ""}`}>
      {segments.map((segment, index) => (
        <span key={segment.href} className="flex items-center gap-2">
          {index > 0 ? (
            <span aria-hidden="true" className="opacity-50">
              •
            </span>
          ) : null}
          <Link href={segment.href} className="transition hover:text-copper">
            {segment.label.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
