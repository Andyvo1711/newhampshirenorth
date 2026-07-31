import { getAllArticles } from "@/lib/articles";

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const article of getAllArticles()) {
    for (const tag of article.tags ?? []) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export function tagExists(tag: string): boolean {
  return getAllTags().includes(tag);
}
