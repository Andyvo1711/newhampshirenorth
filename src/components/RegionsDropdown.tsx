import Link from "next/link";
import { REGIONS_NAV } from "@/lib/nav";

export default function RegionsDropdown() {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 whitespace-nowrap font-sans text-[13px] text-frost/85 transition hover:text-frost [&::-webkit-details-marker]:hidden lg:text-sm">
        Regions
        <span aria-hidden="true" className="text-[10px] transition group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="absolute right-0 top-full z-50 mt-3 grid w-64 grid-cols-1 gap-0 border border-line-dark bg-slate py-2 shadow-xl">
        {REGIONS_NAV.map((region) => (
          <Link
            key={region.href}
            href={region.href}
            className="block px-4 py-2 font-sans text-sm text-frost/80 transition hover:bg-slate-soft hover:text-amber"
          >
            {region.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
