import { LOCATIONS, type Location } from "@/types/article";
import { normalizeSlug } from "@/lib/utils";

interface LocationMeta {
  slug: Location;
  label: string;
  coordinate?: string;
  description: string;
}

const LOCATION_META: Record<Location, LocationMeta> = {
  manchester: {
    slug: "manchester",
    label: "Manchester",
    coordinate: "42.9956° N / 71.4548° W",
    description: "Industry, housing, and neighborhood reporting from New Hampshire's largest city.",
  },
  nashua: {
    slug: "nashua",
    label: "Nashua",
    coordinate: "42.7654° N / 71.4676° W",
    description: "Growth, schools, and local government reporting from the Gate City.",
  },
  concord: {
    slug: "concord",
    label: "Concord",
    coordinate: "43.2081° N / 71.5376° W",
    description: "State government, civic life, and community reporting from New Hampshire's capital.",
  },
  portsmouth: {
    slug: "portsmouth",
    label: "Portsmouth",
    coordinate: "43.0718° N / 70.7626° W",
    description: "Seacoast culture, maritime industry, and historic-preservation reporting on the harbor.",
  },
  dover: {
    slug: "dover",
    label: "Dover",
    coordinate: "43.1979° N / 70.8737° W",
    description: "Community and economic reporting from one of the Seacoast's oldest settlements.",
  },
  keene: {
    slug: "keene",
    label: "Keene",
    coordinate: "42.9337° N / 72.2781° W",
    description: "Monadnock Region news, education, and Main Street business coverage.",
  },
  derry: {
    slug: "derry",
    label: "Derry",
    coordinate: "42.8809° N / 71.3273° W",
    description: "Local government, schools, and community life in southern New Hampshire.",
  },
  exeter: {
    slug: "exeter",
    label: "Exeter",
    coordinate: "42.9814° N / 70.9478° W",
    description: "Civic and community reporting from the Seacoast's historic river town.",
  },
  hampton: {
    slug: "hampton",
    label: "Hampton",
    coordinate: "42.9384° N / 70.8384° W",
    description: "Coastal economy, tourism, and beach-community reporting.",
  },
  rye: {
    slug: "rye",
    label: "Rye",
    coordinate: "43.0356° N / 70.7509° W",
    description: "Shoreline conservation and small-town coastal reporting.",
  },
  berlin: {
    slug: "berlin",
    label: "Berlin",
    coordinate: "44.4686° N / 71.1856° W",
    description: "North Country industry, workforce, and community reporting.",
  },
  littleton: {
    slug: "littleton",
    label: "Littleton",
    coordinate: "44.3078° N / 71.7712° W",
    description: "White Mountains gateway-town news and rural economic reporting.",
  },
  "north-conway": {
    slug: "north-conway",
    label: "North Conway",
    coordinate: "44.0537° N / 71.1284° W",
    description: "Mountain-economy and seasonal-workforce reporting from the Mount Washington Valley.",
  },
  hanover: {
    slug: "hanover",
    label: "Hanover",
    coordinate: "43.7022° N / 72.2896° W",
    description: "Upper Valley education, research, and community reporting.",
  },
  lebanon: {
    slug: "lebanon",
    label: "Lebanon",
    coordinate: "43.6423° N / 72.2518° W",
    description: "Healthcare, housing, and workforce reporting from the Upper Valley.",
  },
  laconia: {
    slug: "laconia",
    label: "Laconia",
    coordinate: "43.5279° N / 71.4703° W",
    description: "Lakes Region tourism, housing, and community reporting.",
  },
  rochester: {
    slug: "rochester",
    label: "Rochester",
    coordinate: "43.3037° N / 70.9756° W",
    description: "Growth and Main Street business reporting from the Lilac City.",
  },
  "southern-new-hampshire": {
    slug: "southern-new-hampshire",
    label: "Southern New Hampshire",
    description: "Regional reporting from the state's most populous corridor along the Massachusetts border.",
  },
  "central-new-hampshire": {
    slug: "central-new-hampshire",
    label: "Central New Hampshire",
    description: "Regional reporting from the communities linking the capital region to the Lakes Region.",
  },
  seacoast: {
    slug: "seacoast",
    label: "Seacoast",
    description: "Regional reporting along New Hampshire's short but consequential Atlantic coastline.",
  },
  "monadnock-region": {
    slug: "monadnock-region",
    label: "Monadnock Region",
    description: "Regional reporting from the towns surrounding Mount Monadnock in southwestern New Hampshire.",
  },
  "lakes-region": {
    slug: "lakes-region",
    label: "Lakes Region",
    description: "Regional reporting from the communities surrounding Lake Winnipesaukee and the state's dark mountain lakes.",
  },
  "white-mountains": {
    slug: "white-mountains",
    label: "White Mountains",
    description: "Regional reporting from the peaks, valleys, and gateway towns of the White Mountain National Forest.",
  },
  "north-country": {
    slug: "north-country",
    label: "North Country",
    description: "Regional reporting from New Hampshire's northernmost communities and working forests.",
  },
  "rural-new-hampshire": {
    slug: "rural-new-hampshire",
    label: "Rural New Hampshire",
    description: "Stories from New Hampshire's small towns and rural, unincorporated communities.",
  },
};

export function getAllLocations(): LocationMeta[] {
  return LOCATIONS.map((slug) => LOCATION_META[slug]);
}

export function isLocation(value: unknown): value is Location {
  return typeof value === "string" && (LOCATIONS as readonly string[]).includes(value);
}

export function normalizeLocationSlug(value: unknown): Location | null {
  const normalized = normalizeSlug(value);
  return isLocation(normalized) ? normalized : null;
}

export function getLocationMeta(slug: unknown): LocationMeta | null {
  const location = normalizeLocationSlug(slug);
  return location ? LOCATION_META[location] : null;
}
