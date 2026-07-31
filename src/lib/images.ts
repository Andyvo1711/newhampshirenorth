const PLACEHOLDER_LANDSCAPE = "/images/placeholder-landscape.svg";
const PLACEHOLDER_PORTRAIT = "/images/placeholder-portrait.svg";
const ALLOWED_IMAGE_HOSTS = ["images.unsplash.com"];

export function getSafeImage(
  value: unknown,
  orientation: "landscape" | "portrait" = "landscape"
): { src: string; isPlaceholder: boolean } {
  const fallback = orientation === "portrait" ? PLACEHOLDER_PORTRAIT : PLACEHOLDER_LANDSCAPE;

  if (typeof value !== "string" || value.trim() === "") {
    return { src: fallback, isPlaceholder: true };
  }
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && ALLOWED_IMAGE_HOSTS.includes(url.hostname)) {
      return { src: value, isPlaceholder: false };
    }
  } catch {
    return { src: fallback, isPlaceholder: true };
  }
  return { src: fallback, isPlaceholder: true };
}

export { PLACEHOLDER_LANDSCAPE, PLACEHOLDER_PORTRAIT };
