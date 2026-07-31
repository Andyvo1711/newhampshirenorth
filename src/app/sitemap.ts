import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { getAllCategories } from "@/lib/categories";
import { getAllLocations } from "@/lib/locations";
import { getAllTags } from "@/lib/tags";
import { safeParseDate } from "@/lib/dates";
import { getSiteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: `${siteUrl}/archive`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${siteUrl}/town-lines`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${siteUrl}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/editorial-standards`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/corrections`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const locationRoutes: MetadataRoute.Sitemap = getAllLocations().map((location) => ({
    url: `${siteUrl}/local/${location.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${siteUrl}/tag/${tag}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.3,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${siteUrl}/article/${article.slug}`,
    lastModified: safeParseDate(article.date) ?? now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...locationRoutes, ...tagRoutes, ...articleRoutes];
}
