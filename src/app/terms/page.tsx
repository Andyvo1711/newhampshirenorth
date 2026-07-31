import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "New Hampshire North's terms of use.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-snow">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="mono-label text-[11px] text-copper">Terms</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Terms of Use</h1>
        <div className="prose-article mt-8">
          <p>
            By accessing New Hampshire North, you agree to use the site for lawful, personal, non-commercial
            purposes unless otherwise agreed in writing.
          </p>
          <h2>Content</h2>
          <p>
            All articles, photography, and graphics published on New Hampshire North are the property of New
            Hampshire North or its contributors and may not be reproduced without permission.
          </p>
          <h2>No Warranty</h2>
          <p>
            Content is provided &ldquo;as is&rdquo; without warranty of any kind. New Hampshire North is not liable
            for decisions made based on information published on this site.
          </p>
        </div>
      </div>
    </div>
  );
}
