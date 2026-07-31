import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { Article, ArticleFrontmatter, ArticleSummary, Category } from "@/types/article";
import { sortArticlesByDate, isValidDateString } from "@/lib/dates";
import {
  calculateReadingTime,
  normalizeTags,
  safeAuthor,
  safeExcerpt,
  safeString,
} from "@/lib/utils";
import { isCategory } from "@/lib/categories";
import { normalizeLocationSlug } from "@/lib/locations";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function readArticleFilenames(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

function normalizeFrontmatter(raw: Record<string, unknown>, fallbackSlug: string): ArticleFrontmatter {
  const category: Category = isCategory(raw.category) ? raw.category : "new-hampshire";
  return {
    title: safeString(raw.title, "Untitled Story"),
    slug: safeString(raw.slug, fallbackSlug),
    excerpt: safeExcerpt(raw.excerpt),
    date: isValidDateString(raw.date) ? (raw.date as string) : "",
    author: safeAuthor(raw.author),
    authorRole: typeof raw.authorRole === "string" ? raw.authorRole : undefined,
    category,
    location: typeof raw.location === "string" ? raw.location : undefined,
    image: typeof raw.image === "string" && raw.image.trim() !== "" ? raw.image : undefined,
    featured: Boolean(raw.featured),
    breaking: Boolean(raw.breaking),
    tags: normalizeTags(raw.tags),
  };
}

let articleCache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (articleCache) return articleCache;

  const filenames = readArticleFilenames();
  const articles: Article[] = [];

  for (const filename of filenames) {
    try {
      const fullPath = path.join(ARTICLES_DIR, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const fallbackSlug = slugFromFilename(filename);
      const frontmatter = normalizeFrontmatter(data, fallbackSlug);

      articles.push({
        ...frontmatter,
        slug: frontmatter.slug || fallbackSlug,
        content,
        readingTime: calculateReadingTime(content),
        hasValidDate: isValidDateString(frontmatter.date),
      });
    } catch {
      continue;
    }
  }

  articleCache = sortArticlesByDate(articles);
  return articleCache;
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(content);
  return result.toString();
}

export function getArticleBySlug(slug: string): Article | null {
  const normalized = safeString(slug);
  if (!normalized) return null;
  return getAllArticles().find((article) => article.slug === normalized) ?? null;
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticlesByLocation(locationSlug: string): Article[] {
  return getAllArticles().filter(
    (article) => normalizeLocationSlug(article.location) === locationSlug
  );
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags?.includes(tag));
}

export function getFeaturedArticles(limit?: number): Article[] {
  const featured = getAllArticles().filter((article) => article.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getBreakingArticles(limit?: number): Article[] {
  const breaking = getAllArticles().filter((article) => article.breaking);
  return typeof limit === "number" ? breaking.slice(0, limit) : breaking;
}

export function getLatestArticles(limit?: number): Article[] {
  const articles = getAllArticles();
  return typeof limit === "number" ? articles.slice(0, limit) : articles;
}

export function toSummary(article: Article): ArticleSummary {
  const { content: _content, ...summary } = article;
  void _content;
  return summary;
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const pool = getAllArticles().filter((candidate) => candidate.slug !== article.slug);

  const scored = pool.map((candidate) => {
    let score = 0;
    if (candidate.category === article.category) score += 3;
    const sharedTags = (candidate.tags ?? []).filter((tag) => article.tags?.includes(tag));
    score += sharedTags.length * 2;
    if (
      article.location &&
      candidate.location &&
      normalizeLocationSlug(candidate.location) === normalizeLocationSlug(article.location)
    ) {
      score += 1;
    }
    return { candidate, score };
  });

  const related = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.candidate);

  const deduped: Article[] = [];
  const seen = new Set<string>();
  for (const item of [...related, ...pool]) {
    if (!seen.has(item.slug)) {
      seen.add(item.slug);
      deduped.push(item);
    }
    if (deduped.length >= limit) break;
  }

  return deduped;
}

export function getAdjacentArticles(article: Article): { previous: Article | null; next: Article | null } {
  const all = getAllArticles();
  const index = all.findIndex((candidate) => candidate.slug === article.slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index < all.length - 1 ? all[index + 1] : null,
    next: index > 0 ? all[index - 1] : null,
  };
}
