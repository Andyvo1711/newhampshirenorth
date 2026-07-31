import type { Metadata } from "next";
import type { Article } from "@/types/article";
import { toIsoDate } from "@/lib/dates";
import { safeString } from "@/lib/utils";
import { PLACEHOLDER_LANDSCAPE } from "@/lib/images";

export const SITE_NAME = "New Hampshire North";
export const SITE_TAGLINE = "Clear Reporting from the Granite State.";
export const SITE_DESCRIPTOR = "A Journal of the Granite State";

export function getSiteUrl(): string {
  return safeString(process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000").replace(/\/+$/, "");
}

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  keywords?: string[];
}

export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${options.path}`;
  const image = options.image ?? `${siteUrl}${PLACEHOLDER_LANDSCAPE}`;
  const title = options.path === "/" ? `${SITE_NAME} — ${SITE_TAGLINE}` : `${options.title} | ${SITE_NAME}`;

  return {
    title,
    description: options.description,
    keywords: options.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: options.description,
      url,
      siteName: SITE_NAME,
      type: options.type ?? "website",
      images: [{ url: image }],
      ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: options.description,
      images: [image],
    },
    authors: options.authors?.map((name) => ({ name })),
  };
}

export function articleMetadata(article: Article): Metadata {
  const publishedTime = toIsoDate(article.date) ?? undefined;
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/article/${article.slug}`,
    image: article.image,
    type: "article",
    publishedTime,
    authors: [article.author],
    keywords: article.tags,
  });
}

export function buildArticleJsonLd(article: Article) {
  const siteUrl = getSiteUrl();
  const publishedTime = toIsoDate(article.date);
  if (!publishedTime) return null;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.image ? [article.image] : undefined,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${PLACEHOLDER_LANDSCAPE}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/article/${article.slug}`,
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}${PLACEHOLDER_LANDSCAPE}`,
    description:
      "New Hampshire North is a statewide digital news publication covering politics, business, technology, environment, travel, beauty and wellness, sports, culture, and opinion across New Hampshire.",
  };
}

export function buildWebsiteJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
