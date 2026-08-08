import type { Locale } from "@/i18n/config";

const intlLocale: Record<Locale, string> = {
  en: "en-GB",
  fr: "fr-FR",
};

/** Formats an ISO date ("2026-03-12") as "12 Mar 2026" / "12 mars 2026". */
export function formatInsightDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
