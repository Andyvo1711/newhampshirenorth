import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import SectionLabel from "@/components/SectionLabel";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface GraniteStateProps {
  featured: Article;
  rows: Article[];
}

export default function GraniteState({ featured, rows }: GraniteStateProps) {
  return (
    <section className="bg-snow" aria-labelledby="granite-state-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="border-b border-granite/25 pb-6">
          <p className="mono-label text-[11px] text-copper">The Granite State</p>
          <h2 id="granite-state-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Built on hard ground. Shaped by independent communities.
          </h2>
        </div>

        <Link href={`/article/${featured.slug}`} className="group mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.45fr)_1fr]">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-granite/20">
            <SafeImage
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              orientation="portrait"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <SectionLabel category={featured.category} location={featured.location} />
            <h3 className="mt-3 font-serif text-4xl leading-tight text-ink transition group-hover:text-copper sm:text-5xl">
              {featured.title}
            </h3>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ink-soft">{featured.excerpt}</p>
            <p className="mono-label mt-5 text-[10px] text-ink-soft/70">
              {featured.author} &middot; {formatDateShort(featured.date)} &middot; {featured.readingTime} min
            </p>
          </div>
        </Link>

        <div className="mt-12 divide-y divide-granite/20 border-t border-granite/25">
          {rows.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5">
              <div>
                <SectionLabel category={article.category} location={article.location} />
                <h4 className="mt-1.5 font-serif text-xl leading-snug text-ink transition group-hover:text-copper">
                  {article.title}
                </h4>
              </div>
              <span className="mono-label hidden shrink-0 text-[10px] text-ink-soft/70 sm:block">
                {formatDateShort(article.date)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
