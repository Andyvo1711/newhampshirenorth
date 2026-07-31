import type { Metadata } from "next";
import { getAllTags } from "@/lib/tags";
import { getArticlesByTag } from "@/lib/articles";
import { paginate, DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import { buildMetadata } from "@/lib/metadata";
import { normalizeTag, tagLabel } from "@/lib/utils";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

interface PageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const normalized = normalizeTag(tag);
  const label = tagLabel(normalized || tag);
  return buildMetadata({
    title: `Tag: ${label}`,
    description: `Every New Hampshire North story tagged ${label}.`,
    path: `/tag/${normalized || tag}`,
  });
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const { tag } = await params;
  const { page } = await searchParams;
  const normalized = normalizeTag(tag);
  const label = tagLabel(normalized || tag);
  const articles = getArticlesByTag(normalized);
  const result = paginate(articles, page, DEFAULT_PAGE_SIZE);

  return (
    <div className="bg-snow">
      <div className="border-b border-line-light">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <p className="mono-label text-[11px] text-copper">Tag</p>
          <h1 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">{label}</h1>
          <p className="mt-3 font-sans text-sm text-ink-soft">
            {result.totalItems} {result.totalItems === 1 ? "story" : "stories"}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <ArticleList articles={result.items} emptyMessage="No stories are tagged with this term yet." />
        <Pagination result={result} basePath={`/tag/${normalized || tag}`} />
      </div>
    </div>
  );
}
