import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Learn about New Hampshire North, a statewide digital news publication covering the entire state of New Hampshire.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-snow">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="mono-label text-[11px] text-copper">About Us</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">New Hampshire North</h1>
        <p className="mt-2 font-serif text-xl italic text-ink-soft">Clear Reporting from the Granite State.</p>

        <div className="prose-article mt-8">
          <p>
            New Hampshire North is a statewide digital news publication built around a simple observation: the
            weather here changes fast, from blue-hour cold on the summits to warm light in a Main Street storefront
            window, but the facts should not. Our newsroom covers the people, places, and decisions connecting
            Manchester and Concord to Portsmouth, the Lakes Region, and the North Country, treating every corner of
            the state as newsworthy.
          </p>
          <p>
            We report on politics, business, technology, the environment, travel, beauty and wellness, sports,
            culture, and opinion with the same editorial standard, whether the story originates in a State House
            committee room or a Seacoast harbor.
          </p>
          <h2>Our Coverage Area</h2>
          <p>
            New Hampshire North reports across Manchester, Nashua, Concord, Portsmouth, Dover, Keene, Derry, Exeter,
            Hampton, Rye, Berlin, Littleton, North Conway, Hanover, Lebanon, Laconia, Rochester, and every region in
            between &mdash; Southern New Hampshire, Central New Hampshire, the Seacoast, the Monadnock Region, the
            Lakes Region, the White Mountains, the North Country, and rural New Hampshire. Statewide journalism, to
            us, means covering the whole map, not just the skyline.
          </p>
          <h2>Editorial Independence</h2>
          <p>
            New Hampshire North is editorially independent. Our reporting and opinion sections are clearly separated,
            and our journalists are expected to disclose conflicts of interest and correct errors transparently.
            Read our full <a href="/editorial-standards">Editorial Standards</a> for more detail.
          </p>
        </div>
      </div>
    </div>
  );
}
