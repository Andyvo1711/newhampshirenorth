import Link from "next/link";
import { MAIN_NAV, REGIONS_NAV } from "@/lib/nav";

interface NorthArchiveProps {
  totalStories: number;
}

export default function NorthArchive({ totalStories }: NorthArchiveProps) {
  return (
    <section className="bg-night" aria-labelledby="north-archive-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-line-dark pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="mono-label text-[11px] text-copper">North Archive</p>
            <h2 id="north-archive-heading" className="mt-2 font-serif text-3xl text-frost sm:text-4xl">
              Every report. Every town. Across New Hampshire.
            </h2>
          </div>
          <Link
            href="/archive"
            className="mono-label shrink-0 border border-frost/40 px-5 py-3 text-[11px] text-frost transition hover:border-copper hover:text-copper"
          >
            View Full Archive ({totalStories}) &rarr;
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mono-label text-[11px] text-mist">Sections</p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link href="/archive" className="font-sans text-sm text-frost/85 transition hover:text-amber">
                  All Stories
                </Link>
              </li>
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-sans text-sm text-frost/85 transition hover:text-amber">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-[11px] text-mist">Regional Archives</p>
            <ul className="mt-3 flex flex-col gap-2">
              {REGIONS_NAV.slice(0, 7).map((region) => (
                <li key={region.href}>
                  <Link href={region.href} className="font-sans text-sm text-frost/85 transition hover:text-amber">
                    {region.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-[11px] text-mist">More Regions</p>
            <ul className="mt-3 flex flex-col gap-2">
              {REGIONS_NAV.slice(7).map((region) => (
                <li key={region.href}>
                  <Link href={region.href} className="font-sans text-sm text-frost/85 transition hover:text-amber">
                    {region.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-[11px] text-mist">Search</p>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-frost/70">
              Every valid story is reachable through search, tags, and pagination &mdash; homepage limits are never
              publishing limits.
            </p>
            <Link href="/search" className="mono-label mt-3 inline-block text-[11px] text-copper hover:text-amber">
              Search New Hampshire North &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
