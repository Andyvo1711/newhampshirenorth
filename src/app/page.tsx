import {
  getAllArticles,
  getArticlesByCategory,
  getArticlesByLocation,
  getLatestArticles,
} from "@/lib/articles";
import type { Article } from "@/types/article";
import ColdOpen from "@/components/ColdOpen";
import WeatherStatement from "@/components/WeatherStatement";
import MorningReport from "@/components/MorningReport";
import GraniteState from "@/components/GraniteState";
import TownLines from "@/components/TownLines";
import WhiteMountains from "@/components/WhiteMountains";
import CivicHouse from "@/components/CivicHouse";
import WorkingNorth from "@/components/WorkingNorth";
import ShortCoast from "@/components/ShortCoast";
import WellAndGood from "@/components/WellAndGood";
import WinterGame from "@/components/WinterGame";
import LanternHours from "@/components/LanternHours";
import IndependentView from "@/components/IndependentView";
import NorthArchive from "@/components/NorthArchive";
import Newsletter from "@/components/Newsletter";

const TOWN_SLUGS = ["manchester", "nashua", "concord", "portsmouth", "dover", "keene", "laconia", "berlin", "littleton", "north-conway"];

function getTownArticles(limit: number): Article[] {
  const seen = new Set<string>();
  const results: Article[] = [];
  const byTown = TOWN_SLUGS.map((town) => getArticlesByLocation(town));
  const maxRounds = Math.max(0, ...byTown.map((articles) => articles.length));

  for (let round = 0; round < maxRounds; round += 1) {
    for (const articles of byTown) {
      const article = articles[round];
      if (article && !seen.has(article.slug)) {
        seen.add(article.slug);
        results.push(article);
      }
      if (results.length >= limit) return results;
    }
  }
  return results;
}

export default function HomePage() {
  const allArticles = getAllArticles();
  const latest = getLatestArticles(8);
  const [reportLead, ...reportPool] = latest;
  const reportMedium = reportPool.slice(0, 2);
  const reportCompact = reportPool.slice(2, 6);

  const nhArticles = getArticlesByCategory("new-hampshire");
  const politicsArticles = getArticlesByCategory("politics");
  const businessArticles = getArticlesByCategory("business");
  const technologyArticles = getArticlesByCategory("technology");
  const environmentArticles = getArticlesByCategory("environment");
  const travelArticles = getArticlesByCategory("travel");
  const beautyArticles = getArticlesByCategory("beauty-wellness");
  const sportsArticles = getArticlesByCategory("sports");
  const cultureArticles = getArticlesByCategory("culture");
  const opinionArticles = getArticlesByCategory("opinion");

  const townPool = getTownArticles(6);
  const [townFeatured, ...townRest] = townPool.length > 0 ? townPool : nhArticles;

  const workingNorthSupporting = [businessArticles[1], technologyArticles[1], businessArticles[2]].filter(
    (article): article is Article => Boolean(article)
  );
  const workingNorthBrief = businessArticles[3] ?? technologyArticles[2];

  const lanternCalendar = [
    { date: "AUG 14", event: "Portsmouth Gallery Walk", place: "Portsmouth" },
    { date: "AUG 22", event: "Monadnock Folk Festival", place: "Keene" },
    { date: "SEP 05", event: "Lakes Region Harvest Market", place: "Laconia" },
    { date: "SEP 19", event: "North Conway Lantern Walk", place: "North Conway" },
  ];

  return (
    <>
      <ColdOpen storyCount={Math.max(latest.length, 1)} />
      <WeatherStatement />

      {reportLead && reportMedium.length > 0 && reportCompact.length > 0 ? (
        <MorningReport lead={reportLead} medium={reportMedium} compact={reportCompact} />
      ) : null}

      {nhArticles[0] && nhArticles.length > 1 ? (
        <GraniteState featured={nhArticles[0]} rows={nhArticles.slice(1, 4)} />
      ) : null}

      {townFeatured && townRest.length > 0 ? (
        <TownLines featured={townFeatured} stories={townRest.slice(0, 5)} />
      ) : null}

      {environmentArticles[0] && environmentArticles.length > 1 ? (
        <WhiteMountains feature={environmentArticles[0]} notes={environmentArticles.slice(1, 4)} />
      ) : null}

      {politicsArticles[0] && politicsArticles.length > 1 ? (
        <CivicHouse
          lead={politicsArticles[0]}
          reports={politicsArticles.slice(1, 4)}
          whatChanges="Bills move through the State House in Concord well before they ever reach a household budget, a school calendar, or a town's property tax rate — but they get there eventually. Here's what residents should watch for in the weeks ahead."
        />
      ) : null}

      {businessArticles[0] && workingNorthBrief ? (
        <WorkingNorth feature={businessArticles[0]} supporting={workingNorthSupporting} brief={workingNorthBrief} />
      ) : null}

      {travelArticles[0] && travelArticles.length > 1 ? (
        <ShortCoast lead={travelArticles[0]} dispatches={travelArticles.slice(1, 4)} />
      ) : null}

      {beautyArticles[0] && beautyArticles.length > 1 ? (
        <WellAndGood feature={beautyArticles[0]} rows={beautyArticles.slice(1, 5)} />
      ) : null}

      {sportsArticles[0] && sportsArticles.length > 1 ? (
        <WinterGame feature={sportsArticles[0]} rest={sportsArticles.slice(1, 4)} />
      ) : null}

      {cultureArticles[0] && cultureArticles.length > 1 ? (
        <LanternHours
          vertical={cultureArticles[0]}
          horizontal={cultureArticles.slice(1, 3)}
          calendar={lanternCalendar}
        />
      ) : null}

      {opinionArticles[0] && opinionArticles.length > 1 ? (
        <IndependentView essay={opinionArticles[0]} supporting={opinionArticles.slice(1, 4)} />
      ) : null}

      <NorthArchive totalStories={allArticles.length} />
      <Newsletter />
    </>
  );
}
