"use client";

import { useState } from "react";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-frost" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="border border-ink/15">
          <div className="flex flex-col items-start justify-between gap-2 border-b border-ink/15 px-6 py-4 sm:flex-row sm:items-center">
            <p className="mono-label text-[11px] text-copper">First Frost &middot; Daily</p>
            <p className="mono-label text-[11px] text-ink-soft">Edition 001</p>
          </div>
          <div className="grid grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-14 lg:py-14">
            <div>
              <h2 id="newsletter-heading" className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
                First Frost
              </h2>
              <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-ink-soft">
                A clear New Hampshire briefing delivered before the day begins.
              </p>
            </div>

            <div className="w-full max-w-md">
              {submitted ? (
                <p className="font-sans text-sm text-copper" role="status">
                  You&rsquo;re on the list. Look for First Frost in your inbox soon.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full border border-ink/25 bg-snow px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 border border-copper bg-copper px-6 py-3 font-sans text-sm font-semibold text-snow transition hover:bg-ink hover:border-ink"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              <p className="mt-4 font-sans text-xs text-ink-soft">
                No spam. Unsubscribe anytime. Read our{" "}
                <a href="/privacy" className="underline hover:text-ink">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
