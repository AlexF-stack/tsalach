import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SecondaryChrome } from "@/components/site/SecondaryChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { brandAssets } from "@/content/brand";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ogImage, pageAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(brandAssets.websiteUrl),
    title: {
      default: dictionary.meta.title,
      template: `%s · TSALACH`,
    },
    description: dictionary.meta.description,
    keywords:
      locale === "fr"
        ? [
            "TSALACH",
            "TSALACH S.A.",
            "Libreville",
            "Gabon",
            "PPP Afrique",
            "PPP Gabon",
            "EPC",
            "contractant général",
            "génie civil",
            "financement structuré",
            "financement de projets",
            "infrastructures",
            "immobilier",
            "logements",
            "équipements publics",
            "travaux publics",
            "aménagement urbain",
            "Afrique centrale",
          ]
        : [
            "TSALACH",
            "TSALACH S.A.",
            "Libreville",
            "Gabon",
            "PPP Africa",
            "PPP Gabon",
            "EPC",
            "general contractor",
            "civil engineering",
            "structured finance",
            "project finance",
            "infrastructure",
            "real estate",
            "housing",
            "public facilities",
            "public works",
            "urban development",
            "Central Africa",
          ],
    authors: [{ name: brandAssets.holdingName }],
    creator: brandAssets.holdingName,
    publisher: brandAssets.holdingName,
    category: "business",
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.png",
    },
    alternates: pageAlternates(locale),
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: `/${locale}`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: "website",
      siteName: brandAssets.holdingName,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
      <JsonLd locale={locale} dictionary={dictionary} />
      <SecondaryChrome>{children}</SecondaryChrome>
    </LocaleProvider>
  );
}
