export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "New Hampshire", href: "/category/new-hampshire" },
  { label: "Town Lines", href: "/town-lines" },
  { label: "Civic House", href: "/category/politics" },
  { label: "Working North", href: "/category/business" },
  { label: "White Mountains", href: "/category/environment" },
  { label: "The Short Coast", href: "/category/travel" },
  { label: "Well & Good", href: "/category/beauty-wellness" },
  { label: "Winter Game", href: "/category/sports" },
  { label: "Lantern Hours", href: "/category/culture" },
  { label: "Independent View", href: "/category/opinion" },
];

export const REGIONS_NAV: NavItem[] = [
  { label: "Manchester", href: "/local/manchester" },
  { label: "Nashua", href: "/local/nashua" },
  { label: "Concord", href: "/local/concord" },
  { label: "Portsmouth", href: "/local/portsmouth" },
  { label: "Dover", href: "/local/dover" },
  { label: "Keene", href: "/local/keene" },
  { label: "Lakes Region", href: "/local/lakes-region" },
  { label: "Monadnock Region", href: "/local/monadnock-region" },
  { label: "Seacoast", href: "/local/seacoast" },
  { label: "White Mountains", href: "/local/white-mountains" },
  { label: "North Country", href: "/local/north-country" },
  { label: "Southern New Hampshire", href: "/local/southern-new-hampshire" },
  { label: "Central New Hampshire", href: "/local/central-new-hampshire" },
  { label: "Rural New Hampshire", href: "/local/rural-new-hampshire" },
];
