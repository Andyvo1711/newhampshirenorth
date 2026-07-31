import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import SectionLabel from "@/components/SectionLabel";
import type { Article } from "@/types/article";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-line-light pt-10">
      <h2 id="related-heading" className="font-serif text-2xl text-ink">
        Related Stories
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-granite/20">
              <SafeImage
                src={article.image}
                alt={article.title}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <SectionLabel category={article.category} location={article.location} className="mt-3" />
            <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink transition group-hover:text-copper">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
