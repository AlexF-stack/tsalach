"use client";

import { BrandLogo } from "@/components/site/BrandLogo";
import { HardLink } from "@/components/site/HardLink";
import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { brandAssets } from "@/content/brand";

export function SiteFooter() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const address = brandAssets.address[locale];
  const buildHref = (href: string) => `/${locale}${href}`;

  return (
    <footer
      data-nav-surface="dark"
      className="relative overflow-hidden border-t border-white/10 bg-[color:var(--navy-deep)] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(201,162,75,0.14), transparent 42%), radial-gradient(ellipse at 100% 100%, rgba(26,36,51,0.55), transparent 48%)",
        }}
        aria-hidden
      />

      <div className="container-herna relative grid gap-10 py-12 sm:gap-12 sm:py-16 md:grid-cols-12 md:gap-10 md:py-20">
        <div className="md:col-span-5">
          <div className="inline-flex">
            <BrandLogo
              variant="dark"
              width={240}
              height={180}
              className="h-auto w-full max-w-[200px] object-contain"
            />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            {dictionary.brand.closing}
          </p>
          <p className="mt-3 max-w-sm text-xs uppercase tracking-[0.12em] text-[color:var(--gold)]/90">
            {dictionary.brand.footprint}
          </p>
          <div className="mt-8 space-y-1.5 text-sm text-white/70">
            <p className="font-display text-base text-white">
              {dictionary.contact.entity}
            </p>
            <p>{address}</p>
            <p>
              <a
                href={`tel:${brandAssets.phoneTel}`}
                className="transition hover:text-[color:var(--gold)]"
              >
                {brandAssets.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${brandAssets.email}`}
                className="transition hover:text-[color:var(--gold)]"
              >
                {brandAssets.email}
              </a>
            </p>
            <p>
              <a
                href={brandAssets.portalUrl}
                className="transition hover:text-[color:var(--gold)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {brandAssets.website}
              </a>
            </p>
          </div>
          <a
            href={brandAssets.companyProfileSrc}
            download={brandAssets.companyProfileDownloadName}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white/85 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            {dictionary.ui.downloadProfile}
          </a>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)]">
            {dictionary.ui.menu}
          </p>
          <ul className="mt-5 space-y-3">
            {dictionary.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={buildHref(link.href)}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)]">
            {dictionary.ui.legalNotice}
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <HardLink
                href={`/${locale}/legal-notice`}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {dictionary.ui.legalNotice}
              </HardLink>
            </li>
            <li>
              <HardLink
                href={`/${locale}/privacy-policy`}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {dictionary.ui.privacyPolicy}
              </HardLink>
            </li>
            <li>
              <a
                href={buildHref("#contact")}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {dictionary.ui.contactShort}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-herna flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/70 sm:justify-between">
          {dictionary.approach.values.map((value) => (
            <span key={value.title} className="inline-flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full bg-[color:var(--gold)]"
                aria-hidden
              />
              {value.title}
            </span>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-herna flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{dictionary.legal.copyright}</p>
          <p className="tracking-wide">{brandAssets.fullName}</p>
        </div>
      </div>
    </footer>
  );
}
