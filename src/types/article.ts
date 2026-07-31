export const CATEGORIES = [
  "new-hampshire",
  "politics",
  "business",
  "technology",
  "environment",
  "travel",
  "beauty-wellness",
  "sports",
  "culture",
  "opinion",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const LOCATIONS = [
  "manchester",
  "nashua",
  "concord",
  "portsmouth",
  "dover",
  "keene",
  "derry",
  "exeter",
  "hampton",
  "rye",
  "berlin",
  "littleton",
  "north-conway",
  "hanover",
  "lebanon",
  "laconia",
  "rochester",
  "southern-new-hampshire",
  "central-new-hampshire",
  "seacoast",
  "monadnock-region",
  "lakes-region",
  "white-mountains",
  "north-country",
  "rural-new-hampshire",
] as const;

export type Location = (typeof LOCATIONS)[number];

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole?: string;
  category: Category;
  location?: string;
  image?: string;
  featured?: boolean;
  breaking?: boolean;
  tags?: string[];
}

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTime: number;
  hasValidDate: boolean;
}

export interface ArticleSummary extends ArticleFrontmatter {
  readingTime: number;
  hasValidDate: boolean;
}
