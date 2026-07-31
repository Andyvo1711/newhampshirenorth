"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MAIN_NAV } from "@/lib/nav";
import NorthWordmark from "@/components/NorthWordmark";
import RegionsDropdown from "@/components/RegionsDropdown";
import MobileMenu from "@/components/MobileMenu";
import SearchModal from "@/components/SearchModal";
import { SITE_TAGLINE } from "@/lib/metadata";

export default function Header() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    function onScroll() {
      setCompact(window.scrollY > 120);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-slate/95 backdrop-blur">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-4 transition-[padding] duration-300 ${compact ? "py-3" : "py-5"}`}>
          <div className="flex items-center gap-3">
            <MobileMenu />
            <NorthWordmark variant={compact ? "compact" : "horizontal"} />
          </div>

          <nav aria-label="Primary" className="no-scrollbar hidden items-center gap-4 overflow-x-auto md:flex lg:gap-5">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap border-b-2 border-transparent py-1 font-sans text-[13px] text-frost/80 transition hover:border-copper hover:text-frost lg:text-sm"
              >
                {item.label}
              </Link>
            ))}
            <RegionsDropdown />
          </nav>

          <div className="flex items-center gap-2">
            <SearchModal />
          </div>
        </div>

        {!compact ? (
          <p className="mono-label hidden pb-3 text-[11px] text-mist md:block">{SITE_TAGLINE}</p>
        ) : null}
      </div>
    </header>
  );
}
