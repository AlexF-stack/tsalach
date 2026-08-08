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
    title: dictionary.legal.noticeTitle,
    description: dictionary.legal.noticeDescription,
    alternates: pageAlternates(locale, "/legal-notice"),
    openGraph: {
      title: dictionary.legal.noticeTitle,
      description: dictionary.legal.noticeDescription,
      url: `/${locale}/legal-notice`,
    },
  };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const address = brandAssets.address[locale];
  const isFr = locale === "fr";

  return (
    <main
      data-nav-surface="light"
      className="min-h-screen bg-[color:var(--bg)] pb-24 pt-28 text-[color:var(--ink)]"
    >
      <div className="container-herna max-w-3xl">
        <BackLink href={`/${locale}`}>{dictionary.ui.backHome}</BackLink>
        <h1 className="heading-display mt-10 text-display-md">
          {dictionary.legal.noticeTitle}
        </h1>
        <div className="mt-10 space-y-8 text-[color:var(--muted)]">
          <section>
            <h2 className="font-display text-lg text-[color:var(--ink)]">
              {isFr ? "Éditeur" : "Publisher"}
            </h2>
            <p className="mt-3 leading-relaxed">
              <span className="text-[color:var(--ink)]">
                {brandAssets.holdingName}
              </span>
              {" — "}
              {brandAssets.fullName} ({brandAssets.name})
            </p>
            <p className="mt-2">{address}</p>
            <p className="mt-2">
              {dictionary.ui.phone}:{" "}
              <a
                href={`tel:${brandAssets.phoneTel}`}
                className="text-[color:var(--gold)] hover:underline"
              >
                {brandAssets.phone}
              </a>
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href={`mailto:${brandAssets.email}`}
                className="text-[color:var(--gold)] hover:underline"
              >
                {brandAssets.email}
              </a>
            </p>
            <p className="mt-2">
              {dictionary.ui.website}:{" "}
              <a
                href={brandAssets.websiteUrl}
                className="text-[color:var(--gold)] hover:underline"
              >
                {brandAssets.website}
              </a>
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg text-[color:var(--ink)]">
              {isFr ? "Hébergement" : "Hosting"}
            </h2>
            <p className="mt-3 leading-relaxed">
              {isFr
                ? "Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis."
                : "This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States."}
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg text-[color:var(--ink)]">
              {isFr ? "Propriété intellectuelle" : "Intellectual property"}
            </h2>
            <p className="mt-3 leading-relaxed">
              {isFr
                ? "L'ensemble des contenus (textes, images, marques, logo) est la propriété de TSALACH S.A., sauf mention contraire. Toute reproduction, représentation ou diffusion non autorisée est interdite."
                : "All content (texts, images, trademarks, logo) is owned by TSALACH S.A. unless otherwise stated. Unauthorized reproduction, representation or distribution is prohibited."}
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg text-[color:var(--ink)]">
              {isFr ? "Limitation de responsabilité" : "Limitation of liability"}
            </h2>
            <p className="mt-3 leading-relaxed">
              {dictionary.legal.noticeExtra}
            </p>
          </section>
          <p className="text-sm">{dictionary.legal.copyright}</p>
        </div>
      </div>
    </main>
  );
}
