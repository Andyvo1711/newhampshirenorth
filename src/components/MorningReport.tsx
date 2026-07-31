import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import SectionLabel from "@/components/SectionLabel";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface MorningReportProps {
  lead: Article;
  medium: Article[];
  compact: Article[];
}

function ReportNumber({ index }: { index: number }) {
  return <span className="mono-label text-[11px] text-copper">REPORT {String(index).padStart(2, "0")}</span>;
}

export default function MorningReport({ lead, medium, compact }: MorningReportProps) {
  return (
    <section id="morning-report" className="scroll-mt-24 bg-slate" aria-labelledby="morning-report-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex items-end justify-between border-b border-line-dark pb-6">
          <div>
            <p className="mono-label text-[11px] text-copper">Morning Report</p>
            <h2 id="morning-report-heading" className="mt-2 font-serif text-3xl text-frost sm:text-4xl">
              The essential New Hampshire stories at the start of the day.
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Link href={`/article/${lead.slug}`} className="group block">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-granite/40">
              <SafeImage
                src={lead.image}
                alt={lead.title}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              {lead.breaking ? (
                <span className="mono-label absolute left-0 top-0 bg-amber px-3 py-1.5 text-[11px] text-ink">Developing</span>
              ) : null}
            </div>
            <div className="mt-4 flex items-start gap-3">
              <ReportNumber index={1} />
              <div>
                <SectionLabel category={lead.category} location={lead.location} tone="light" />
                <h3 className="mt-2 font-serif text-3xl leading-tight text-frost transition group-hover:text-amber sm:text-4xl">
                  {lead.title}
                </h3>
                <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-frost/70">{lead.excerpt}</p>
                <p className="mono-label mt-3 text-[10px] text-mist">
                  {lead.author} &middot; {formatDateShort(lead.date)} &middot; {lead.readingTime} min
                </p>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-8 border-t border-line-dark pt-8 lg:border-t-0 lg:pt-0">
            {medium.map((article, i) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="group grid grid-cols-[128px_1fr] gap-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-granite/40">
                  <SafeImage
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="128px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <ReportNumber index={i + 2} />
                  <h4 className="mt-1 font-serif text-lg leading-snug text-frost transition group-hover:text-amber">
                    {article.title}
                  </h4>
                  <p className="mono-label mt-2 text-[10px] text-mist">{formatDateShort(article.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-line-dark pt-8">
          <ul className="grid grid-cols-1 divide-y divide-line-dark sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {compact.map((article, i) => (
              <li key={article.slug} className="py-4 sm:px-6 sm:py-0 first:sm:pl-0">
                <Link href={`/article/${article.slug}`} className="group flex items-start gap-3">
                  <ReportNumber index={i + 4} />
                  <span className="font-sans text-sm leading-snug text-frost/85 transition group-hover:text-amber">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
