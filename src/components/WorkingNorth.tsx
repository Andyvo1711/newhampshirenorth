import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import SectionLabel from "@/components/SectionLabel";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

const INDEX_LABELS = ["Work", "Housing", "Growth", "Main Street", "Technology"];

interface WorkingNorthProps {
  feature: Article;
  supporting: Article[];
  brief: Article;
}

export default function WorkingNorth({ feature, supporting, brief }: WorkingNorthProps) {
  return (
    <section className="bg-slate" aria-labelledby="working-north-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className="mono-label flex flex-wrap gap-x-6 gap-y-2 border-b border-line-dark pb-4 text-[11px] text-mist">
          {INDEX_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </p>

        <div className="mt-2 pt-6">
          <p className="mono-label text-[11px] text-copper">Working North</p>
          <h2 id="working-north-heading" className="mt-2 font-serif text-3xl text-frost sm:text-4xl">
            The businesses, workers, and industries shaping the state.
          </h2>
        </div>

        <Link href={`/article/${feature.slug}`} className="group mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-granite/40">
            <SafeImage src={feature.image} alt={feature.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center">
            <SectionLabel category={feature.category} location={feature.location} tone="light" />
            <h3 className="mt-3 font-serif text-3xl leading-tight text-frost transition group-hover:text-amber sm:text-4xl">
              {feature.title}
            </h3>
            <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-frost/70">{feature.excerpt}</p>
          </div>
        </Link>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-line-dark pt-10 lg:grid-cols-[2fr_1fr]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {supporting.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
                <SectionLabel category={article.category} location={article.location} tone="light" />
                <h4 className="mt-2 font-serif text-lg leading-snug text-frost transition group-hover:text-amber">{article.title}</h4>
                <p className="mono-label mt-2 text-[10px] text-mist">{formatDateShort(article.date)}</p>
              </Link>
            ))}
          </div>

          <div className="border border-line-dark p-6">
            <p className="mono-label text-[11px] text-copper">Economic Brief</p>
            <Link href={`/article/${brief.slug}`} className="group mt-3 block">
              <h4 className="font-serif text-xl leading-snug text-frost transition group-hover:text-amber">{brief.title}</h4>
              <p className="mt-2 font-sans text-sm leading-relaxed text-frost/70">{brief.excerpt}</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
