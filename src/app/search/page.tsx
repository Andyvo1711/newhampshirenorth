import type { Metadata } from "next";
import { Search } from "lucide-react";
import { searchArticles } from "@/lib/search";
import { paginate, DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import { buildMetadata } from "@/lib/metadata";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search New Hampshire North for stories across politics, business, technology, environment, and more.",
  path: "/search",
});

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const results = query ? searchArticles(query) : [];
  const result = paginate(results, page, DEFAULT_PAGE_SIZE);

  return (
    <div className="bg-snow">
      <div className="border-b border-line-dark bg-slate">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <p className="mono-label text-[11px] text-amber">Search</p>
          <h1 className="mt-2 font-serif text-4xl text-frost sm:text-5xl">Find a Story</h1>
          <form action="/search" method="get" className="mt-6 flex max-w-xl items-center gap-2 border-b border-frost/30 pb-3">
            <Search size={18} className="text-frost/60" aria-hidden="true" />
            <label htmlFor="search-query" className="sr-only">
              Search articles
            </label>
            <input
              id="search-query"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search New Hampshire North..."
              className="w-full bg-transparent font-sans text-lg text-frost placeholder:text-frost/50 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 border border-copper px-4 py-2 font-sans text-sm font-semibold text-frost transition hover:bg-copper"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        {query ? (
          <p className="mb-6 font-sans text-sm text-ink-soft">
            {result.totalItems} {result.totalItems === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <p className="mb-6 font-sans text-sm text-ink-soft">Enter a search term to explore New Hampshire North stories.</p>
        )}
        <ArticleList
          articles={result.items}
          emptyMessage={query ? "No stories matched your search. Try a different term." : "Start typing to search."}
        />
        <Pagination result={result} basePath="/search" searchParams={{ q: query }} />
      </div>
    </div>
  );
}
