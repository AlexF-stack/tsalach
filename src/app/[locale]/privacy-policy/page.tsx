import { BackLink } from "@/components/site/BackLink";
import { brandAssets } from "@/content/brand";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    title: dictionary.legal.privacyTitle,
    description: dictionary.legal.privacyIntro,
    alternates: pageAlternates(locale, "/privacy-policy"),
    openGraph: {
      title: dictionary.legal.privacyTitle,
      description: dictionary.legal.privacyIntro,
      url: `/${locale}/privacy-policy`,
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const isFr = locale === "fr";

  return (
    <main
      data-nav-surface="light"
      className="min-h-screen bg-[color:var(--bg)] pb-24 pt-28 text-[color:var(--ink)]"
    >
      <div className="container-herna max-w-3xl">
        <BackLink href={`/${locale}`}>{dictionary.ui.backHome}</BackLink>
        <h1 className="heading-display mt-10 text-display-md">
          {dictionary.legal.privacyTitle}
        </h1>
        <div className="mt-10 space-y-8 text-[color:var(--muted)]">
          <p className="leading-relaxed">{dictionary.legal.privacyIntro}</p>
          <section>
            <h2 className="font-display text-lg text-[color:var(--ink)]">
              {dictionary.legal.privacyContactHeading}
            </h2>
            <p className="mt-3 leading-relaxed">
              {dictionary.legal.privacyContactBody}{" "}
              <a
                href={`mailto:${brandAssets.email}`}
                className="text-[color:var(--gold)] hover:underline"
              >
                {brandAssets.email}
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg text-[color:var(--ink)]">
              {dictionary.legal.privacyDataHeading}
            </h2>
            <p className="mt-3 leading-relaxed">
              {dictionary.legal.privacyDataBody}
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg text-[color:var(--ink)]">
              {dictionary.legal.privacyRetentionHeading}
            </h2>
            <p className="mt-3 leading-relaxed">
              {dictionary.legal.privacyRetentionBody}
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg text-[color:var(--ink)]">
              {isFr ? "Vos droits" : "Your rights"}
            </h2>
            <p className="mt-3 leading-relaxed">
              {dictionary.legal.privacyPlaceholder}
            </p>
          </section>
          <p className="text-sm">{dictionary.legal.copyright}</p>
        </div>
      </div>
    </main>
  );
}
