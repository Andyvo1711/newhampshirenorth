import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface ShortCoastProps {
  lead: Article;
  dispatches: Article[];
}

export default function ShortCoast({ lead, dispatches }: ShortCoastProps) {
  return (
    <section className="bg-snow" aria-labelledby="short-coast-heading">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-granite/30 sm:aspect-[21/9]">
        <SafeImage src={lead.image} alt={lead.title} fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-copper" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <p className="mono-label text-[11px] text-amber">The Short Coast</p>
            <h2 id="short-coast-heading" className="mt-2 max-w-2xl font-serif text-3xl leading-tight text-snow sm:text-5xl">
              A small coastline with an outsized story.
            </h2>
            <Link href={`/article/${lead.slug}`} className="group mt-4 inline-block">
              <span className="font-serif text-xl text-snow/90 underline decoration-copper/60 underline-offset-4 transition group-hover:text-amber">
                {lead.title}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {dispatches.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-granite/20">
                <SafeImage src={article.image} alt={article.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mono-label mt-3 text-[11px] text-copper">{article.location ?? "Seacoast"}</p>
              <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink transition group-hover:text-copper">{article.title}</h3>
              <p className="mono-label mt-2 text-[10px] text-ink-soft/70">{formatDateShort(article.date)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
