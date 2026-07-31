import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { REGIONS_NAV } from "@/lib/nav";

export const metadata: Metadata = buildMetadata({
  title: "Town Lines",
  description: "Every town draws its own line through New Hampshire's story — browse coverage by region across the state.",
  path: "/town-lines",
});

const TOWN_GROUPS = [
  { region: "South", towns: [{ name: "Manchester", href: "/local/manchester" }, { name: "Nashua", href: "/local/nashua" }, { name: "Derry", href: "/local/derry" }, { name: "Southern New Hampshire", href: "/local/southern-new-hampshire" }] },
  { region: "Capital", towns: [{ name: "Concord", href: "/local/concord" }, { name: "Central New Hampshire", href: "/local/central-new-hampshire" }] },
  { region: "Seacoast", towns: [{ name: "Portsmouth", href: "/local/portsmouth" }, { name: "Dover", href: "/local/dover" }, { name: "Exeter", href: "/local/exeter" }, { name: "Hampton", href: "/local/hampton" }, { name: "Rye", href: "/local/rye" }, { name: "Seacoast (Region)", href: "/local/seacoast" }] },
  { region: "Monadnock", towns: [{ name: "Keene", href: "/local/keene" }, { name: "Monadnock Region", href: "/local/monadnock-region" }] },
  { region: "Lakes", towns: [{ name: "Laconia", href: "/local/laconia" }, { name: "Rochester", href: "/local/rochester" }, { name: "Lakes Region", href: "/local/lakes-region" }] },
  { region: "Upper Valley", towns: [{ name: "Hanover", href: "/local/hanover" }, { name: "Lebanon", href: "/local/lebanon" }] },
  { region: "White Mountains", towns: [{ name: "North Conway", href: "/local/north-conway" }, { name: "Littleton", href: "/local/littleton" }, { name: "White Mountains (Region)", href: "/local/white-mountains" }] },
  { region: "North", towns: [{ name: "Berlin", href: "/local/berlin" }, { name: "North Country", href: "/local/north-country" }] },
  { region: "Rural", towns: [{ name: "Rural New Hampshire", href: "/local/rural-new-hampshire" }] },
];

export default function TownLinesPage() {
  return (
    <div className="bg-frost">
      <div className="border-b border-granite/25">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <p className="mono-label text-[11px] text-copper">Town Lines</p>
          <h1 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">Every Town Draws Its Own Line</h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink-soft">
            New Hampshire North organizes local coverage by region, from the Massachusetts border to the North
            Country. Choose a town or region below to see every story reported there.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TOWN_GROUPS.map((group, index) => (
            <div key={group.region} className="border-l border-granite/30 pl-5">
              <p className="mono-label flex items-baseline gap-2 text-[11px] text-ink-soft">
                <span className="text-copper">{String(index + 1).padStart(2, "0")}</span>
                {group.region}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {group.towns.map((town) => (
                  <li key={town.href}>
                    <Link href={town.href} className="font-sans text-sm text-ink transition hover:text-copper">
                      {town.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-granite/25 pt-8">
          <p className="mono-label text-[11px] text-ink-soft">All Regions</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {REGIONS_NAV.map((region) => (
              <Link
                key={region.href}
                href={region.href}
                className="border border-granite/30 px-4 py-2 font-sans text-sm text-ink transition hover:border-copper hover:text-copper"
              >
                {region.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
