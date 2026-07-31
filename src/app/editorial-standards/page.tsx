import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Standards",
  description: "The editorial standards guiding New Hampshire North's reporting across the state.",
  path: "/editorial-standards",
});

export default function EditorialStandardsPage() {
  return (
    <div className="bg-snow">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="mono-label text-[11px] text-copper">Editorial Standards</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">How We Report</h1>
        <div className="prose-article mt-8">
          <p>
            New Hampshire North holds every story, regardless of section or region, to the same standard of
            accuracy, fairness, and transparency.
          </p>
          <h2>Accuracy</h2>
          <p>
            We verify facts before publication and attribute claims to named sources whenever possible. When we get
            something wrong, we correct it publicly and promptly.
          </p>
          <h2>Independence</h2>
          <p>
            Our newsroom operates independently of any political party, business interest, or advocacy organization.
            Opinion and analysis content is clearly labeled and separated from news reporting.
          </p>
          <h2>Fairness</h2>
          <p>
            We seek comment from all relevant parties in a story and represent perspectives fairly, including
            perspectives we may not personally hold.
          </p>
        </div>
      </div>
    </div>
  );
}
