import Link from "next/link";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface IndependentViewProps {
  essay: Article;
  supporting: Article[];
}

export default function IndependentView({ essay, supporting }: IndependentViewProps) {
  return (
    <section className="bg-frost" aria-labelledby="independent-view-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="border-b border-granite/30 pb-6 text-center">
          <p className="mono-label text-[11px] text-copper">The Independent View</p>
          <h2 id="independent-view-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Ideas shaped close to home.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="mono-label text-[11px] text-ink-soft">Featured Essay</p>
          <Link href={`/article/${essay.slug}`} className="group mt-4 block">
            <h3 className="font-serif text-3xl italic leading-tight text-ink transition group-hover:text-copper sm:text-5xl">
              {essay.title}
            </h3>
          </Link>
          <p className="mt-5 font-sans text-base leading-relaxed text-ink-soft">{essay.excerpt}</p>
          <p className="mono-label mt-5 text-[10px] text-ink-soft/70">
            {essay.author}
            {essay.authorRole ? `, ${essay.authorRole}` : ""} &middot; {formatDateShort(essay.date)} &middot; {essay.readingTime} min
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 divide-y divide-granite/25 border-t border-granite/30 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {supporting.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="group block py-6 sm:px-6 sm:py-0 first:sm:pl-0">
              <h4 className="font-serif text-lg leading-snug text-ink transition group-hover:text-copper">{article.title}</h4>
              <p className="mono-label mt-3 text-[10px] text-ink-soft/70">
                {article.author} &middot; {formatDateShort(article.date)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
