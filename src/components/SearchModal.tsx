"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    setOpen(false);
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="flex h-9 w-9 items-center justify-center text-frost/80 transition hover:text-copper"
      >
        <Search size={18} aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-night/90 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="w-full max-w-xl border border-line-dark bg-slate p-6" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <p className="mono-label text-[11px] text-copper">Search New Hampshire North</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="text-frost/70 transition hover:text-frost"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-frost/40 pb-3">
              <Search size={18} className="text-mist" aria-hidden="true" />
              <label htmlFor="site-search-input" className="sr-only">
                Search articles
              </label>
              <input
                ref={inputRef}
                id="site-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search New Hampshire North..."
                className="w-full bg-transparent font-sans text-lg text-frost placeholder:text-mist focus:outline-none"
              />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
