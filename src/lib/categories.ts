import { CATEGORIES, type Category } from "@/types/article";
import { normalizeSlug } from "@/lib/utils";

interface CategoryMeta {
  slug: Category;
  /** Editorial section name used in breadcrumbs, nav, and page headings. */
  label: string;
  /** Plain technical name, used as a sub-label where the editorial name is shared by several categories. */
  technicalLabel: string;
  subtitle: string;
  description: string;
}

const CATEGORY_META: Record<Category, CategoryMeta> = {
  "new-hampshire": {
    slug: "new-hampshire",
    label: "The Granite State",
    technicalLabel: "New Hampshire",
    subtitle: "Built on hard ground. Shaped by independent communities.",
    description:
      "Statewide New Hampshire reporting on housing, education, transportation, healthcare, and the institutions connecting Manchester to the North Country.",
  },
  politics: {
    slug: "politics",
    label: "Civic House",
    technicalLabel: "Politics",
    subtitle: "Government close enough to question.",
    description:
      "Coverage of the Governor's office, the State House, town meetings, and the public policy decisions shaping New Hampshire.",
  },
  business: {
    slug: "business",
    label: "Working North",
    technicalLabel: "Business",
    subtitle: "The businesses, workers, and industries shaping the state.",
    description:
      "New Hampshire business news — manufacturing, Main Street, workforce, housing, and the industries moving the state's economy.",
  },
  technology: {
    slug: "technology",
    label: "Working North",
    technicalLabel: "Technology",
    subtitle: "The businesses, workers, and industries shaping the state.",
    description:
      "Technology and innovation reporting from New Hampshire's growing companies, research institutions, and startups.",
  },
  environment: {
    slug: "environment",
    label: "White Mountains",
    technicalLabel: "Environment",
    subtitle: "Weather, work, wilderness, and life above the valleys.",
    description:
      "Conservation, weather, wildlife, and mountain-economy reporting from the White Mountains and New Hampshire's public lands.",
  },
  travel: {
    slug: "travel",
    label: "The Short Coast",
    technicalLabel: "Travel",
    subtitle: "A small coastline with an outsized story.",
    description:
      "Seacoast, maritime, and travel reporting from Portsmouth, Hampton, Rye, Dover, Exeter, and New Hampshire's coastal communities.",
  },
  "beauty-wellness": {
    slug: "beauty-wellness",
    label: "Well & Good",
    technicalLabel: "Beauty & Wellness",
    subtitle: "Care, health, and service standards within the community.",
    description:
      "Consumer-focused reporting on New Hampshire's beauty and wellness businesses — pricing transparency, cleanliness, and service quality.",
  },
  sports: {
    slug: "sports",
    label: "Winter Game",
    technicalLabel: "Sports",
    subtitle: "From the rink to the fairgrounds, across every season.",
    description:
      "College, high school, community, and outdoor athletics reporting from across New Hampshire.",
  },
  culture: {
    slug: "culture",
    label: "Lantern Hours",
    technicalLabel: "Culture",
    subtitle: "Where New Hampshire gathers after dark.",
    description:
      "Arts, music, dining, and entertainment reporting on the creative and community life of New Hampshire.",
  },
  opinion: {
    slug: "opinion",
    label: "The Independent View",
    technicalLabel: "Opinion",
    subtitle: "Ideas shaped close to home.",
    description:
      "Editorials, analysis, investigations, and guest essays on the issues defining New Hampshire's future.",
  },
};

export function getAllCategories(): CategoryMeta[] {
  return CATEGORIES.map((slug) => CATEGORY_META[slug]);
}

export function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (CATEGORIES as readonly string[]).includes(value);
}

export function normalizeCategorySlug(value: unknown): Category | null {
  const normalized = normalizeSlug(value);
  return isCategory(normalized) ? normalized : null;
}

export function getCategoryMeta(slug: unknown): CategoryMeta | null {
  const category = normalizeCategorySlug(slug);
  return category ? CATEGORY_META[category] : null;
}
