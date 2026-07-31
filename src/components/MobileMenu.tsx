"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { MAIN_NAV, REGIONS_NAV } from "@/lib/nav";
import NorthWordmark from "@/components/NorthWordmark";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center text-frost"
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] bg-slate" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="flex items-center justify-between border-b border-line-dark px-5 py-4">
            <NorthWordmark variant="compact" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center text-frost"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav className="max-h-[calc(100vh-73px)] overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="/" onClick={() => setOpen(false)} className="block py-2.5 font-serif text-2xl text-frost">
                  Home
                </Link>
              </li>
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block py-2.5 font-serif text-2xl text-frost">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mono-label mt-8 mb-3 text-[11px] text-copper">Regions</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {REGIONS_NAV.map((region) => (
                <li key={region.href}>
                  <Link href={region.href} onClick={() => setOpen(false)} className="block py-1.5 font-sans text-sm text-frost/80">
                    {region.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
