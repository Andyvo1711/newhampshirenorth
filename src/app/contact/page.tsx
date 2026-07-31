import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contact the New Hampshire North newsroom with tips, corrections, or general inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-snow">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="mono-label text-[11px] text-copper">Contact</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Get in Touch</h1>
        <div className="prose-article mt-8">
          <p>
            Have a story tip, a correction, or a question about our coverage? We want to hear from readers across
            every corner of New Hampshire.
          </p>
          <h2>Newsroom</h2>
          <p>For story tips and editorial questions: newsroom@newhampshirenorth.example</p>
          <h2>Corrections</h2>
          <p>To report an error in a published story: corrections@newhampshirenorth.example</p>
          <h2>General Inquiries</h2>
          <p>For advertising, partnerships, or other inquiries: hello@newhampshirenorth.example</p>
        </div>
      </div>
    </div>
  );
}
