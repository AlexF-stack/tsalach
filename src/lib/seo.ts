import { locales, type Locale } from "@/i18n/config";
import { brandAssets } from "@/content/brand";

const BASE = brandAssets.websiteUrl;

/** Absolute page URL for a locale path (path starts with / or is empty for home). */
export function localeUrl(locale: Locale, path = ""): string {
  const clean = path && !path.startsWith("/") ? `/${path}` : path;
  return `${BASE}/${locale}${clean}`;
}

/** Canonical + hreflang for a locale-scoped path (e.g. "", "/legal-notice", "/divisions/energy"). */
export function pageAlternates(locale: Locale, path = "") {
  const clean = path && !path.startsWith("/") ? `/${path}` : path;
  return {
    canonical: `/${locale}${clean}`,
    languages: {
      ...Object.fromEntries(
        locales.map((l) => [l, `/${l}${clean}`]),
      ),
      "x-default": `/en${clean}`,
    },
  };
}

export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${brandAssets.holdingName} — Structuring, financing & infrastructure in Gabon`,
} as const;
