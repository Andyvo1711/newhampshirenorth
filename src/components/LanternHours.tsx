import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface CalendarEvent {
  date: string;
  event: string;
  place: string;
}

interface LanternHoursProps {
  vertical: Article;
  horizontal: Article[];
  calendar: CalendarEvent[];
}

export default function LanternHours({ vertical, horizontal, calendar }: LanternHoursProps) {
  return (
    <section className="bg-pine-dark" aria-labelledby="lantern-hours-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="border-b border-line-dark pb-6">
          <p className="mono-label text-[11px] text-amber">Lantern Hours</p>
          <h2 id="lantern-hours-heading" className="mt-2 font-serif text-3xl text-frost sm:text-4xl">
            Where New Hampshire gathers after dark.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.5fr)_1fr]">
          <Link href={`/article/${vertical.slug}`} className="group block">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-granite/40">
              <SafeImage
                src={vertical.image}
                alt={vertical.title}
                fill
                orientation="portrait"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mono-label mt-4 text-[11px] text-amber">{vertical.location ?? "Statewide"}</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight text-frost transition group-hover:text-amber">{vertical.title}</h3>
          </Link>

          <div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {horizontal.map((article) => (
                <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-granite/40">
                    <SafeImage src={article.image} alt={article.title} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <h4 className="mt-3 font-serif text-xl leading-snug text-frost transition group-hover:text-amber">{article.title}</h4>
                  <p className="mono-label mt-2 text-[10px] text-frost/50">{formatDateShort(article.date)}</p>
                </Link>
              ))}
            </div>

            <div className="mt-10 border-t border-line-dark pt-6">
              <p className="mono-label text-[11px] text-amber">Event Calendar</p>
              <ul className="mt-4 flex flex-col gap-3">
                {calendar.map((event) => (
                  <li key={`${event.date}-${event.event}`} className="mono-label flex items-baseline justify-between gap-4 text-[11px] text-frost/85">
                    <span className="text-amber">{event.date}</span>
                    <span className="flex-1 px-4 normal-case tracking-normal font-sans text-sm text-frost">{event.event}</span>
                    <span className="text-frost/50">{event.place}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
