import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import SectionLabel from "@/components/SectionLabel";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group grid grid-cols-[120px_1fr] items-start gap-4 border-b border-line-light py-6 first:pt-0 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-6"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-granite/20">
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          sizes="180px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div>
        <SectionLabel category={article.category} location={article.location} />
        <h3 className="mt-1.5 font-serif text-xl leading-snug text-ink transition group-hover:text-copper sm:text-2xl">
          {article.title}
        </h3>
        <p className="mt-1.5 hidden font-sans text-sm leading-relaxed text-ink-soft sm:block">
          {article.excerpt}
        </p>
        <p className="mono-label mt-2 text-[10px] text-ink-soft/70">
          {article.author} · {formatDateShort(article.date)} · {article.readingTime} min
        </p>
      </div>
    </Link>
  );
}
