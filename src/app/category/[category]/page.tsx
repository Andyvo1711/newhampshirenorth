import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryMeta } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { paginate, DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import { buildMetadata } from "@/lib/metadata";
import { formatDateShort } from "@/lib/dates";
import SafeImage from "@/components/SafeImage";
import SectionLabel from "@/components/SectionLabel";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import type { Category, Article } from "@/types/article";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) {
    return buildMetadata({ title: "Section Not Found", description: "This section could not be found.", path: `/category/${category}` });
  }
  return buildMetadata({ title: meta.label, description: meta.description, path: `/category/${meta.slug}` });
}

function CategoryHero({ category, featured }: { category: Category; featured: Article }) {
  if (category === "new-hampshire") {
    return (
      <div className="bg-snow py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Link href={`/article/${featured.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.45fr)_1fr]">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-granite/20">
              <SafeImage src={featured.image} alt={featured.title} fill orientation="portrait" sizes="40vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mono-label text-[11px] text-copper">{featured.location ?? "Statewide"}</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-ink-soft">{featured.excerpt}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (category === "politics") {
    return (
      <div className="border-b border-granite/25 bg-frost py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
          <Link href={`/article/${featured.slug}`} className="group block border-r-0 border-granite/25 lg:border-r lg:pr-10">
            <p className="mono-label text-[11px] text-copper">Lead Policy Story</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink transition group-hover:text-copper sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ink-soft">{featured.excerpt}</p>
            <p className="mono-label mt-4 text-[10px] text-ink-soft/70">
              {featured.author} &middot; {formatDateShort(featured.date)}
            </p>
          </Link>
          <div className="border border-copper/40 bg-snow p-6">
            <p className="mono-label border border-copper/60 px-2 py-1 text-[10px] text-copper inline-block">What It Means</p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft">{featured.excerpt}</p>
          </div>
        </div>
      </div>
    );
  }

  if (category === "business" || category === "technology") {
    return (
      <div className="border-b border-line-dark bg-slate py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <p className="mono-label flex flex-wrap gap-x-6 gap-y-2 border-b border-line-dark pb-4 text-[11px] text-mist">
            <span>Work</span>
            <span>Housing</span>
            <span>Growth</span>
            <span>Main Street</span>
            <span>Technology</span>
          </p>
          <Link href={`/article/${featured.slug}`} className="group mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-granite/40">
              <SafeImage src={featured.image} alt={featured.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center">
              <SectionLabel category={featured.category} location={featured.location} tone="light" />
              <h2 className="mt-3 font-serif text-3xl leading-tight text-frost sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-frost/70">{featured.excerpt}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (category === "environment") {
    return (
      <Link href={`/article/${featured.slug}`} className="group relative block aspect-[21/9] w-full overflow-hidden bg-night">
        <SafeImage src={featured.image} alt={featured.title} fill sizes="100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <p className="mono-label text-[11px] text-amber">White Mountains Dispatch</p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-frost sm:text-5xl">{featured.title}</h2>
        </div>
      </Link>
    );
  }

  if (category === "travel") {
    return (
      <div className="bg-snow py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Link href={`/article/${featured.slug}`} className="group block">
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-ink/10">
              <SafeImage src={featured.image} alt={featured.title} fill sizes="100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-copper" />
            </div>
            <p className="mono-label mt-6 text-[11px] text-copper">{featured.location ?? "Seacoast"}</p>
            <h2 className="mt-2 max-w-2xl font-serif text-3xl leading-tight text-ink sm:text-4xl">{featured.title}</h2>
          </Link>
        </div>
      </div>
    );
  }

  if (category === "beauty-wellness") {
    return (
      <div className="bg-frost py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Link href={`/article/${featured.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.55fr)_1fr]">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/10">
              <SafeImage src={featured.image} alt={featured.title} fill sizes="40vw" orientation="portrait" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mono-label text-[11px] text-copper">{featured.location ?? "New Hampshire"}</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-ink-soft">{featured.excerpt}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (category === "sports") {
    return (
      <div className="bg-snow py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Link href={`/article/${featured.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/10">
              <SafeImage src={featured.image} alt={featured.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="mono-label absolute left-0 top-0 bg-ink px-3 py-1.5 text-[11px] text-snow">01</span>
            </div>
            <div className="flex flex-col justify-center border-t-2 border-copper pt-4 lg:border-t-0 lg:pt-0">
              <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-ink-soft">{featured.excerpt}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (category === "culture") {
    return (
      <div className="bg-pine-dark py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Link href={`/article/${featured.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.6fr)_1fr]">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-granite/40">
              <SafeImage src={featured.image} alt={featured.title} fill sizes="40vw" orientation="portrait" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mono-label text-[11px] text-amber">{featured.location ?? "New Hampshire"}</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-frost sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-frost/70">{featured.excerpt}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (category === "opinion") {
    return (
      <div className="bg-frost py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mono-label text-[11px] text-copper">Featured Essay</p>
          <h2 className="mt-4">
            <Link href={`/article/${featured.slug}`} className="font-serif text-3xl italic leading-tight text-ink transition hover:text-copper sm:text-5xl">
              {featured.title}
            </Link>
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-ink-soft">{featured.excerpt}</p>
          <p className="mono-label mt-4 text-[10px] text-ink-soft/70">
            {featured.author} &middot; {formatDateShort(featured.date)}
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const { page } = await searchParams;
  const meta = getCategoryMeta(categorySlug);
  if (!meta) notFound();

  const articles = getArticlesByCategory(meta.slug);
  const [featured, ...rest] = articles;
  const result = paginate(rest, page, DEFAULT_PAGE_SIZE);

  return (
    <div>
      <div className="border-b border-line-dark bg-slate">
        <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8">
          <p className="mono-label text-[11px] text-amber">
            {meta.label}
            {meta.technicalLabel !== meta.label ? ` · ${meta.technicalLabel}` : ""}
          </p>
          <h1 className="mt-2 font-serif text-4xl text-frost sm:text-5xl">{meta.label}</h1>
          <p className="mt-3 max-w-2xl pb-8 font-sans text-sm leading-relaxed text-frost/70">{meta.subtitle}</p>
        </div>
      </div>

      {featured ? <CategoryHero category={meta.slug} featured={featured} /> : null}

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <ArticleList articles={result.items} emptyMessage="More stories from this section are on the way." />
        <Pagination result={result} basePath={`/category/${meta.slug}`} />
      </div>
    </div>
  );
}
