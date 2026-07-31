import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import type { Article } from "@/types/article";

interface TownGroup {
  region: string;
  href: string;
  towns: { name: string; href: string }[];
}

const TOWN_GROUPS: TownGroup[] = [
  {
    region: "South",
    href: "/local/southern-new-hampshire",
    towns: [
      { name: "Manchester", href: "/local/manchester" },
      { name: "Nashua", href: "/local/nashua" },
      { name: "Derry", href: "/local/derry" },
    ],
  },
  {
    region: "Capital",
    href: "/local/central-new-hampshire",
    towns: [{ name: "Concord", href: "/local/concord" }],
  },
  {
    region: "Seacoast",
    href: "/local/seacoast",
    towns: [
      { name: "Portsmouth", href: "/local/portsmouth" },
      { name: "Dover", href: "/local/dover" },
      { name: "Exeter", href: "/local/exeter" },
      { name: "Hampton", href: "/local/hampton" },
      { name: "Rye", href: "/local/rye" },
    ],
  },
  {
    region: "Monadnock",
    href: "/local/monadnock-region",
    towns: [{ name: "Keene", href: "/local/keene" }],
  },
  {
    region: "Lakes",
    href: "/local/lakes-region",
    towns: [{ name: "Laconia", href: "/local/laconia" }, { name: "Rochester", href: "/local/rochester" }],
  },
  {
    region: "North",
    href: "/local/north-country",
    towns: [
      { name: "Berlin", href: "/local/berlin" },
      { name: "Littleton", href: "/local/littleton" },
      { name: "North Conway", href: "/local/north-conway" },
    ],
  },
];

interface TownLinesProps {
  featured: Article;
  stories: Article[];
}

export default function TownLines({ featured, stories }: TownLinesProps) {
  return (
    <section className="bg-frost" aria-labelledby="town-lines-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="border-b border-granite/30 pb-6">
          <p className="mono-label text-[11px] text-copper">Town Lines</p>
          <h2 id="town-lines-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Every town draws its own line through the state&rsquo;s story.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Link href={`/article/${featured.slug}`} className="group block">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-granite/20">
              <SafeImage
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mono-label mt-4 text-[11px] text-copper">{featured.location ?? "Statewide"}</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight text-ink transition group-hover:text-copper">
              {featured.title}
            </h3>
            <p className="mt-3 max-w-lg font-sans text-sm leading-relaxed text-ink-soft">{featured.excerpt}</p>
          </Link>

          <div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {TOWN_GROUPS.map((group, index) => (
                <div key={group.region} className="border-l border-granite/30 pl-4">
                  <p className="mono-label flex items-baseline gap-2 text-[11px] text-ink-soft">
                    <span className="text-copper">{String(index + 1).padStart(2, "0")}</span>
                    {group.region}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {group.towns.map((town) => (
                      <li key={town.href}>
                        <Link href={town.href} className="font-sans text-sm text-ink transition hover:text-copper">
                          {town.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={group.href} className="mono-label mt-2 inline-block text-[10px] text-ink-soft/70 hover:text-copper">
                    Region archive &rarr;
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 divide-y divide-granite/20 border-t border-granite/30">
              {stories.map((story) => (
                <Link key={story.slug} href={`/article/${story.slug}`} className="group flex items-center justify-between gap-4 py-3">
                  <span className="font-sans text-sm text-ink transition group-hover:text-copper">{story.title}</span>
                  <span className="mono-label shrink-0 text-[10px] text-ink-soft/70">{story.location ?? ""}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
