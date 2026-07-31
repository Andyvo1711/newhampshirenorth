import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Corrections",
  description: "New Hampshire North's approach to corrections and how to report an error.",
  path: "/corrections",
});

export default function CorrectionsPage() {
  return (
    <div className="bg-snow">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="mono-label text-[11px] text-copper">Corrections</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Corrections Policy</h1>
        <div className="prose-article mt-8">
          <p>
            New Hampshire North is committed to accuracy. When we make a factual error, we correct it as quickly as
            possible and note the correction transparently.
          </p>
          <h2>Reporting an Error</h2>
          <p>
            If you believe a story contains a factual error, email corrections@newhampshirenorth.example with the
            headline, publish date, and a description of the issue.
          </p>
          <h2>Current Corrections</h2>
          <p>There are no active corrections at this time.</p>
        </div>
      </div>
    </div>
  );
}
