import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getAllArticles,
  getArticleBySlug,
  getAdjacentArticles,
  getRelatedArticles,
  renderMarkdown,
} from "@/lib/articles";
import { formatDate } from "@/lib/dates";
import { articleMetadata, buildArticleJsonLd, buildBreadcrumbJsonLd, getSiteUrl } from "@/lib/metadata";
import { getCategoryMeta } from "@/lib/categories";
import { tagLabel } from "@/lib/utils";
import SafeImage from "@/components/SafeImage";
import NorthBreadcrumb from "@/components/NorthBreadcrumb";
import ShareButtons from "@/components/ShareButtons";
import RelatedArticles from "@/components/RelatedArticles";
import Newsletter from "@/components/Newsletter";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Article Not Found | New Hampshire North", description: "This article could not be found." };
  }
  return articleMetadata(article);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const [html, related, { previous, next }] = await Promise.all([
    renderMarkdown(article.content),
    Promise.resolve(getRelatedArticles(article, 3)),
    Promise.resolve(getAdjacentArticles(article)),
  ]);

  const categoryMeta = getCategoryMeta(article.category);
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/article/${article.slug}`;
  const articleJsonLd = buildArticleJsonLd(article);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: categoryMeta?.label ?? "New Hampshire", path: `/category/${article.category}` },
    { name: article.title, path: `/article/${article.slug}` },
  ]);

  return (
    <article>
      {articleJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="border-b border-line-dark bg-slate">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <NorthBreadcrumb category={article.category} className="mb-4 text-frost/60" />

          <p className="flex flex-wrap items-center gap-2">
            <span className="mono-label text-[11px] text-amber">{categoryMeta?.label ?? "New Hampshire"}</span>
            {article.location ? (
              <>
                <span aria-hidden="true" className="text-frost/40">
                  /
                </span>
                <span className="font-sans text-sm text-frost/60">{article.location}</span>
              </>
            ) : null}
            {article.breaking ? (
              <span className="border border-amber px-1.5 py-0.5 text-[10px] text-amber">Developing</span>
            ) : null}
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-[1.08] text-frost sm:text-5xl">{article.title}</h1>
          <p className="mt-4 font-sans text-lg leading-relaxed text-frost/70">{article.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm text-frost/60">
            <span>
              By <span className="text-frost/90">{article.author}</span>
              {article.authorRole ? `, ${article.authorRole}` : ""}
            </span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={article.hasValidDate ? article.date : undefined}>{formatDate(article.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </header>

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-granite/30">
        <SafeImage src={article.image} alt={article.title} fill priority sizes="100vw" className="object-cover" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="prose-article" dangerouslySetInnerHTML={{ __html: html }} />

        {article.tags && article.tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-line-light pt-6">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="border border-line-light px-3 py-1 font-sans text-xs text-ink-soft transition hover:border-copper hover:text-copper"
              >
                #{tagLabel(tag)}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between border-t border-line-light pt-6">
          <ShareButtons url={articleUrl} title={article.title} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-line-light pt-6 sm:grid-cols-2">
          {previous ? (
            <Link href={`/article/${previous.slug}`} className="group flex flex-col gap-1">
              <span className="mono-label flex items-center gap-1 text-[11px] text-copper">
                <ArrowLeft size={13} aria-hidden="true" />
                Previous
              </span>
              <span className="font-serif text-lg leading-snug text-ink transition group-hover:text-copper">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/article/${next.slug}`} className="group flex flex-col gap-1 sm:items-end sm:text-right">
              <span className="mono-label flex items-center gap-1 text-[11px] text-copper">
                Next
                <ArrowRight size={13} aria-hidden="true" />
              </span>
              <span className="font-serif text-lg leading-snug text-ink transition group-hover:text-copper">
                {next.title}
              </span>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <RelatedArticles articles={related} />
      </div>

      <Newsletter />
    </article>
  );
}
