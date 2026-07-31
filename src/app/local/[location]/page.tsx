import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLocations, getLocationMeta } from "@/lib/locations";
import { getArticlesByLocation } from "@/lib/articles";
import { paginate, DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import { buildMetadata } from "@/lib/metadata";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import SafeImage from "@/components/SafeImage";
import SectionLabel from "@/components/SectionLabel";

export function generateStaticParams() {
  return getAllLocations().map((location) => ({ location: location.slug }));
}

interface PageProps {
  params: Promise<{ location: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const meta = getLocationMeta(location);
  if (!meta) {
    return buildMetadata({ title: "Region Not Found", description: "This region could not be found.", path: `/local/${location}` });
  }
  return buildMetadata({ title: meta.label, description: meta.description, path: `/local/${meta.slug}` });
}

export default async function LocalPage({ params, searchParams }: PageProps) {
  const { location: locationSlug } = await params;
  const { page } = await searchParams;
  const meta = getLocationMeta(locationSlug);
  if (!meta) notFound();

  const articles = getArticlesByLocation(meta.slug);
  const [featured, ...rest] = articles;
  const result = paginate(rest, page, DEFAULT_PAGE_SIZE);

  return (
    <div>
      <div className="border-b border-line-dark bg-slate">
        <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8">
          <p className="mono-label text-[11px] text-amber">Regional Coverage</p>
          <h1 className="mt-2 font-serif text-4xl text-frost sm:text-5xl">{meta.label}</h1>
          {meta.coordinate ? <p className="mono-label mt-2 text-[11px] text-frost/60">{meta.coordinate}</p> : null}
          <p className="mt-3 max-w-2xl pb-8 font-sans text-sm leading-relaxed text-frost/70">{meta.description}</p>
        </div>
      </div>

      {featured ? (
        <div className="border-b border-line-light bg-snow py-12 lg:py-16">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <Link href={`/article/${featured.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-granite/20">
                <SafeImage src={featured.image} alt={featured.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center">
                <SectionLabel category={featured.category} location={featured.location} />
                <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">{featured.title}</h2>
                <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-ink-soft">{featured.excerpt}</p>
              </div>
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <ArticleList articles={result.items} emptyMessage="No stories from this region yet. Check back soon." />
        <Pagination result={result} basePath={`/local/${meta.slug}`} />
      </div>
    </div>
  );
}
