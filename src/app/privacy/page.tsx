import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "New Hampshire North's privacy policy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-snow">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="mono-label text-[11px] text-copper">Privacy</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Privacy Policy</h1>
        <div className="prose-article mt-8">
          <p>
            New Hampshire North respects your privacy. This site does not require an account to read articles, and
            we do not sell personal information to third parties.
          </p>
          <h2>Newsletter</h2>
          <p>
            If you subscribe to First Frost, we use your email address only to deliver the newsletter. You may
            unsubscribe at any time.
          </p>
          <h2>Analytics</h2>
          <p>
            We may use basic, privacy-respecting analytics to understand aggregate readership trends. We do not use
            this data to identify individual readers.
          </p>
        </div>
      </div>
    </div>
  );
}
