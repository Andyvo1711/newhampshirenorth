import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

const MOUNTAIN_IMAGE =
  "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80";

interface WhiteMountainsProps {
  feature: Article;
  notes: Article[];
}

export default function WhiteMountains({ feature, notes }: WhiteMountainsProps) {
  return (
    <section className="bg-night" aria-labelledby="white-mountains-heading">
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <SafeImage
          src={MOUNTAIN_IMAGE}
          alt="A panoramic winter view across the White Mountains of New Hampshire"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1400px] items-end justify-between">
            <div>
              <p className="mono-label text-[11px] text-amber">White Mountains</p>
              <h2 id="white-mountains-heading" className="mt-2 font-serif text-3xl text-frost sm:text-4xl">
                Weather, work, wilderness, and life above the valleys.
              </h2>
            </div>
            <p className="mono-label hidden text-[11px] text-frost/70 sm:block">ELEVATION 6,288 FT</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Link href={`/article/${feature.slug}`} className="group grid grid-cols-1 gap-8 border-b border-line-dark pb-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="mono-label text-[11px] text-copper">{feature.location ?? "White Mountains"}</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-frost transition group-hover:text-amber sm:text-4xl">
              {feature.title}
            </h3>
            <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-frost/70">{feature.excerpt}</p>
            <p className="mono-label mt-4 text-[10px] text-mist">
              {feature.author} &middot; {formatDateShort(feature.date)}
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-granite/40">
            <SafeImage src={feature.image} alt={feature.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" />
          </div>
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {notes.map((note, i) => (
            <Link key={note.slug} href={`/article/${note.slug}`} className="group block">
              <p className="mono-label text-[11px] text-copper">MOUNTAIN NOTE {String(i + 1).padStart(2, "0")}</p>
              <h4 className="mt-2 font-serif text-xl leading-snug text-frost transition group-hover:text-amber">{note.title}</h4>
              <p className="mono-label mt-3 text-[10px] text-mist">{formatDateShort(note.date)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
