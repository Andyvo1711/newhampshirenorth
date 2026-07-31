import Link from "next/link";

interface NorthWordmarkProps {
  variant?: "stacked" | "horizontal" | "compact";
  tone?: "frost" | "ink";
  className?: string;
}

export default function NorthWordmark({ variant = "horizontal", tone = "frost", className }: NorthWordmarkProps) {
  const textColor = tone === "ink" ? "text-ink" : "text-frost";

  if (variant === "compact") {
    return (
      <Link href="/" aria-label="New Hampshire North home" className={`font-serif text-lg tracking-tight ${textColor} ${className ?? ""}`}>
        NH<span className="font-semibold">—N</span>
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <Link href="/" aria-label="New Hampshire North home" className={`block font-serif leading-[0.94] ${textColor} ${className ?? ""}`}>
        <span className="block text-2xl font-normal tracking-tight sm:text-3xl">NEW HAMPSHIRE</span>
        <span className="block text-2xl font-semibold tracking-tight sm:text-3xl">NORTH</span>
      </Link>
    );
  }

  return (
    <Link href="/" aria-label="New Hampshire North home" className={`font-serif text-xl tracking-tight sm:text-2xl ${textColor} ${className ?? ""}`}>
      NEW HAMPSHIRE <span className="opacity-60">—</span> <span className="font-semibold">NORTH</span>
    </Link>
  );
}
