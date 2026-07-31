import Link from "next/link";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface CivicHouseProps {
  lead: Article;
  reports: Article[];
  whatChanges: string;
}

export default function CivicHouse({ lead, reports, whatChanges }: CivicHouseProps) {
  return (
    <section className="border-y border-granite/25 bg-frost" aria-labelledby="civic-house-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="border-b border-granite/30 pb-6">
          <p className="mono-label text-[11px] text-copper">Civic House</p>
          <h2 id="civic-house-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Government close enough to question.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="lg:border-r lg:border-granite/25 lg:pr-10">
            <Link href={`/article/${lead.slug}`} className="group block">
              <p className="mono-label text-[11px] text-ink-soft">Lead Policy Report</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-ink transition group-hover:text-copper sm:text-4xl">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ink-soft">{lead.excerpt}</p>
              <p className="mono-label mt-4 text-[10px] text-ink-soft/70">
                {lead.author} &middot; {formatDateShort(lead.date)}
              </p>
            </Link>

            <div className="mt-10 divide-y divide-granite/20 border-t border-granite/25">
              {reports.map((report, i) => (
                <Link key={report.slug} href={`/article/${report.slug}`} className="group grid grid-cols-[auto_1fr] items-baseline gap-4 py-4">
                  <span className="mono-label text-[11px] text-copper">DOC {String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-lg leading-snug text-ink transition group-hover:text-copper">{report.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-copper/40 bg-snow p-6">
            <p className="mono-label border border-copper/60 px-2 py-1 text-[10px] text-copper inline-block">What Changes</p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft">{whatChanges}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
