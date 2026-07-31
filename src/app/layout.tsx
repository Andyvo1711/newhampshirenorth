import type { Metadata } from "next";
import { Fraunces, Public_Sans, Roboto_Mono } from "next/font/google";
import Header from "@/components/Header";
import Northline from "@/components/Northline";
import Footer from "@/components/Footer";
import { buildMetadata, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/metadata";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: "New Hampshire North",
  description:
    "New Hampshire North is a statewide digital news publication covering politics, business, technology, environment, travel, beauty and wellness, sports, culture, and opinion across New Hampshire.",
  path: "/",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${publicSans.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-copper focus:px-4 focus:py-2 focus:text-snow"
        >
          Skip to content
        </a>
        <Header />
        <Northline />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
