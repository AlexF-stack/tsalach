"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { HardLink } from "@/components/site/HardLink";
import { brandAssets } from "@/content/brand";

export function TsaFooter() {
  const dictionary = useDictionary();
  const { locale } = useLocale();

  return (
    <footer
      data-nav-surface="dark"
      data-tone="dark"
      className="bg-[color:var(--ink)] text-white"
    >
      <div className="bg-[color:var(--accent)]/10">
        <ul className="container-tsa flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
          {dictionary.approach.values.map((v) => (
            <li
              key={v.title}
              className="font-display text-sm font-semibold tracking-[0.04em] text-[color:var(--accent)]"
            >
              {v.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="container-tsa py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl font-bold tracking-[0.08em] text-white">
              {brandAssets.name}
            </p>
            <p className="mt-3 max-w-sm text-sm text-white/55">
              {dictionary.brand.closing}
            </p>
            <a
              href={brandAssets.companyProfileSrc}
              download={brandAssets.companyProfileDownloadName}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[color:var(--accent)] hover:underline"
            >
              {dictionary.ui.downloadProfile}
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-1 text-sm text-white/65 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1">
              {dictionary.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={`/${locale}${link.href}`}
                    className="inline-flex min-h-11 items-center hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{dictionary.legal.copyright}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <HardLink
              href={`/${locale}/legal-notice`}
              className="inline-flex min-h-11 items-center hover:text-[color:var(--accent)]"
            >
              {dictionary.ui.legalNotice}
            </HardLink>
            <HardLink
              href={`/${locale}/privacy-policy`}
              className="inline-flex min-h-11 items-center hover:text-[color:var(--accent)]"
            >
              {dictionary.ui.privacyPolicy}
            </HardLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
