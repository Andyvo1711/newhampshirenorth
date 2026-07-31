import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { MAIN_NAV, REGIONS_NAV } from "@/lib/nav";
import NorthWordmark from "@/components/NorthWordmark";
import { SITE_TAGLINE, SITE_DESCRIPTOR } from "@/lib/metadata";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-dark bg-night text-frost">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <NorthWordmark variant="stacked" tone="frost" />
            <p className="mono-label mt-4 text-[11px] text-amber">{SITE_TAGLINE}</p>
            <p className="mt-4 max-w-xs font-sans text-sm text-frost/70">{SITE_DESCRIPTOR}</p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" aria-label="New Hampshire North on Twitter" className="text-frost/70 transition hover:text-amber">
                <Twitter size={18} aria-hidden="true" />
              </a>
              <a href="#" aria-label="New Hampshire North on Instagram" className="text-frost/70 transition hover:text-amber">
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a href="#" aria-label="New Hampshire North on Facebook" className="text-frost/70 transition hover:text-amber">
                <Facebook size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <p className="mono-label text-[11px] text-copper">Sections</p>
            <ul className="mt-4 flex flex-col gap-2">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-sans text-sm text-frost/75 transition hover:text-frost">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-[11px] text-copper">Regions</p>
            <ul className="mt-4 flex flex-col gap-2">
              {REGIONS_NAV.map((region) => (
                <li key={region.href}>
                  <Link href={region.href} className="font-sans text-sm text-frost/75 transition hover:text-frost">
                    {region.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-[11px] text-copper">About</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/about" className="font-sans text-sm text-frost/75 transition hover:text-frost">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans text-sm text-frost/75 transition hover:text-frost">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="font-sans text-sm text-frost/75 transition hover:text-frost">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="font-sans text-sm text-frost/75 transition hover:text-frost">
                  Corrections
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="font-sans text-sm text-frost/75 transition hover:text-frost">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="font-sans text-sm text-frost/75 transition hover:text-frost">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="font-sans text-sm text-frost/75 transition hover:text-frost">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-dark pt-6 font-sans text-xs text-frost/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} New Hampshire North. All rights reserved.</p>
          <p className="mono-label text-[10px]">Cold Outside. Warm Journalism.</p>
        </div>
      </div>
    </footer>
  );
}
