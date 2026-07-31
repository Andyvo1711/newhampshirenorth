import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { formatDateShort } from "@/lib/dates";
import type { Article } from "@/types/article";

interface ScoreRow {
  home: string;
  away: string;
  score: string;
  note: string;
}

const SAMPLE_SCORES: ScoreRow[] = [
  { home: "Manchester", away: "Nashua", score: "3–2", note: "Final · Static example" },
  { home: "Concord", away: "Keene", score: "58–47", note: "Final · Static example" },
  { home: "Dartmouth", away: "UNH", score: "24–17", note: "Final · Static example" },
];

interface WinterGameProps {
  feature: Article;
  rest: Article[];
}

export default function WinterGame({ feature, rest }: WinterGameProps) {
  return (
    <section className="bg-snow" aria-labelledby="winter-game-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="border-b border-granite/25 pb-6">
          <p className="mono-label text-[11px] text-copper">Winter Game</p>
          <h2 id="winter-game-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            New Hampshire sports, every season.
          </h2>
        </div>

        <Link href={`/article/${feature.slug}`} className="group mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-granite/20">
            <SafeImage src={feature.image} alt={feature.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <span className="mono-label absolute left-0 top-0 bg-ink px-3 py-1.5 text-[11px] text-snow">01</span>
          </div>
          <div className="flex flex-col justify-center border-t-2 border-copper pt-4 lg:border-t-0 lg:pt-0">
            <h3 className="font-serif text-3xl leading-tight text-ink transition group-hover:text-copper sm:text-4xl">{feature.title}</h3>
            <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-ink-soft">{feature.excerpt}</p>
            <p className="mono-label mt-4 text-[10px] text-ink-soft/70">
              {feature.author} &middot; {formatDateShort(feature.date)}
            </p>
          </div>
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {rest.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
                <h4 className="font-serif text-lg leading-snug text-ink transition group-hover:text-copper">{article.title}</h4>
                <p className="mono-label mt-2 text-[10px] text-ink-soft/70">{formatDateShort(article.date)}</p>
              </Link>
            ))}
          </div>

          <div className="border border-granite/30 bg-slate px-5 py-4">
            <p className="mono-label text-[10px] text-mist">Sample Scoreboard &middot; Static Example Data</p>
            <ul className="mt-3 flex flex-col gap-2">
              {SAMPLE_SCORES.map((row) => (
                <li key={`${row.home}-${row.away}`} className="mono-label flex items-center justify-between gap-6 text-[11px] text-frost">
                  <span>
                    {row.home} <span className="text-copper">vs</span> {row.away}
                  </span>
                  <span className="text-amber">{row.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
