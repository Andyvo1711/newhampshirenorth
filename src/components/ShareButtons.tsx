"use client";

import { useState } from "react";
import { Facebook, Link2, Twitter } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="mono-label text-[11px] text-ink-soft">Share</span>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="flex h-8 w-8 items-center justify-center border border-line-light text-ink-soft transition hover:border-copper hover:text-copper"
      >
        <Twitter size={15} aria-hidden="true" />
      </a>
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex h-8 w-8 items-center justify-center border border-line-light text-ink-soft transition hover:border-copper hover:text-copper"
      >
        <Facebook size={15} aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="flex h-8 w-8 items-center justify-center border border-line-light text-ink-soft transition hover:border-copper hover:text-copper"
      >
        <Link2 size={15} aria-hidden="true" />
      </button>
      {copied ? (
        <span role="status" className="font-sans text-xs text-copper">
          Copied
        </span>
      ) : null}
    </div>
  );
}
