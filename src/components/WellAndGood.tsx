import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface WellAndGoodProps {
  feature: Article;
  rows: Article[];
}

export default function WellAndGood({ feature, rows }: WellAndGoodProps) {
  return (
    <section className="bg-snow" aria-labelledby="well-and-good-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="border-b border-granite/25 pb-6">
          <p className="mono-label text-[11px] text-copper">Well &amp; Good</p>
          <h2 id="well-and-good-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Care, health, and service standards within the community.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.5fr)_1fr]">
          <Link href={`/article/${feature.slug}`} className="group block">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-granite/20">
              <SafeImage
                src={feature.image}
                alt={feature.title}
                fill
                orientation="portrait"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mono-label mt-4 text-[11px] text-copper">{feature.location ?? "Statewide"}</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight text-ink transition group-hover:text-copper">{feature.title}</h3>
            <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink-soft">{feature.excerpt}</p>
          </Link>

          <div className="divide-y divide-granite/20 border-t border-granite/25 lg:border-t-0">
            {rows.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="group flex items-center justify-between gap-6 py-5">
                <div>
                  <p className="mono-label text-[11px] text-copper">{article.location ?? "Well & Good"}</p>
                  <h4 className="mt-1.5 font-serif text-xl leading-snug text-ink transition group-hover:text-copper">{article.title}</h4>
                </div>
                <span className="mono-label hidden shrink-0 text-[10px] text-ink-soft/70 sm:block">{formatDateShort(article.date)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
