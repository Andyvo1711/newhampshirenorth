import type { Metadata } from "next";
import { getLatestArticles } from "@/lib/articles";
import { paginate, DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import { buildMetadata } from "@/lib/metadata";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = buildMetadata({
  title: "North Archive",
  description: "Every story published by New Hampshire North, across every region and section.",
  path: "/archive",
});

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArchivePage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const articles = getLatestArticles();
  const result = paginate(articles, page, DEFAULT_PAGE_SIZE);

  return (
    <div className="bg-snow">
      <div className="border-b border-line-dark bg-slate">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <p className="mono-label text-[11px] text-amber">North Archive</p>
          <h1 className="mt-2 font-serif text-4xl text-frost sm:text-5xl">Every Report. Every Town.</h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-frost/70">
            The complete New Hampshire North archive, sorted from most to least recent.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-6 font-sans text-sm text-ink-soft">
          {result.totalItems} {result.totalItems === 1 ? "story" : "stories"} published
        </p>
        <ArticleList articles={result.items} emptyMessage="No stories have been published yet." />
        <Pagination result={result} basePath="/archive" />
      </div>
    </div>
  );
}
