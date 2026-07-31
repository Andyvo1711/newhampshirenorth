import { getAllArticles } from "@/lib/articles";
import type { Article } from "@/types/article";

export function searchArticles(rawQuery: unknown): Article[] {
  const query = typeof rawQuery === "string" ? rawQuery.trim() : "";
  if (!query) return [];

  const needle = query.toLowerCase();
  const articles = getAllArticles();

  return articles.filter((article) => {
    const haystacks = [
      article.title,
      article.excerpt,
      article.category,
      article.location ?? "",
      article.content,
      ...(article.tags ?? []),
    ];
    return haystacks.some((field) => field.toLowerCase().includes(needle));
  });
}
