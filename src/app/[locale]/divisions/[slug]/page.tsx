import { BackLink } from "@/components/site/BackLink";
import { HardLink } from "@/components/site/HardLink";
import { objetVisuals } from "@/content/visuals";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

const divisionSlugs = [
  "immobilier",
  "epc",
  "ppp",
  "engineering",
  "public-works",
] as const;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    divisionSlugs.map((slug) => ({ locale, slug })),
  );
}

function findDivision(locale: Locale, slug: string) {
  const dictionary = getDictionary(locale);
  return dictionary.divisions.items.find((item) => item.id === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const item = findDivision(locale, slug);
  if (!item) return {};
  const image = objetVisuals[slug] ?? item.imageSrc;
  return {
    title: item.title,
    description: item.description,
    alternates: pageAlternates(locale, `/divisions/${slug}`),
    openGraph: {
      title: item.title,
      description: item.description,
      url: `/${locale}/divisions/${slug}`,
      images: [{ url: image, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [image],
    },
  };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const item = findDivision(locale, slug);
  if (!item) notFound();
  const image = objetVisuals[slug] ?? item.imageSrc;

  return (
    <main
      data-nav-surface="light"
      data-tone="light"
      className="min-h-screen bg-white text-[color:var(--ink)]"
    >
      <div className="relative min-h-[42svh] overflow-hidden bg-black md:min-h-[52svh]">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={75}
          className="img-theme object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35" />
        <div className="container-tsa relative z-10 flex min-h-[42svh] flex-col justify-end pb-10 pt-28 md:min-h-[52svh] md:pb-14 md:pt-32">
          <BackLink
            href={`/${locale}#objet`}
            className="text-sm text-white/60 transition hover:text-[color:var(--accent)]"
          >
            {dictionary.ui.backToDivisions}
          </BackLink>
          <p className="label-act mt-8 text-[#C69214]">
            {dictionary.divisions.actLabel}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(1.85rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            {item.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            {item.description}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#C69214]" aria-hidden />
      </div>

      <div className="container-tsa py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed text-[color:var(--muted)] md:text-lg">
              {item.body}
            </p>
            <div className="mt-10 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <HardLink
                href={`/${locale}#contact`}
                className="btn-primary !rounded-full"
              >
                {dictionary.ui.contactShort}
              </HardLink>
              <HardLink
                href={`/${locale}#objet`}
                className="btn-secondary !rounded-full"
              >
                {dictionary.ui.allDivisions}
              </HardLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C69214]">
              {locale === "fr" ? "Périmètre" : "Scope"}
            </p>
            <ul className="mt-5 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
              {item.focus.map((focus) => (
                <li
                  key={focus}
                  className="flex items-start gap-3 py-4 text-sm text-[color:var(--ink)] md:text-base"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#C69214]"
                    aria-hidden
                  />
                  {focus}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
