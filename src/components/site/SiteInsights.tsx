"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/site/Reveal";
import { formatInsightDate } from "@/i18n/formatDate";
import Link from "next/link";

export function SiteInsights() {
  const dictionary = useDictionary();
  const { locale } = useLocale();

  return (
    <section
      id="insights"
      className="section-pad"
      aria-labelledby="insights-heading"
    >
      <div className="container-herna">
        <Reveal className="max-w-2xl">
          <p className="label-act">{dictionary.insights.label}</p>
          <h2
            id="insights-heading"
            className="heading-display mt-4 text-display-md"
          >
            {dictionary.insights.headline}
          </h2>
          <p className="mt-5 text-body-lg text-[color:var(--muted)]">
            {dictionary.insights.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.insights.items.map((insight, i) => (
            <Reveal key={insight.id} delay={i * 0.06}>
              <Link
                href={`/${locale}/insights/${insight.id}`}
                data-cursor-hover
                className="group flex h-full flex-col rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-elevated)] p-6 shine-border transition duration-500 hover:border-[color:var(--gold)]/35 md:p-7"
              >
                <div className="flex items-center gap-3 text-xs text-[color:var(--muted)]">
                  <span className="chip-maroon rounded-full px-2.5 py-1 font-medium uppercase tracking-wide">
                    {insight.category}
                  </span>
                  <time dateTime={insight.date}>
                    {formatInsightDate(insight.date, locale)}
                  </time>
                </div>
                <h3 className="mt-5 font-display text-lg leading-snug text-[color:var(--ink)] md:text-xl">
                  {insight.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">
                  {insight.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--gold)] transition group-hover:gap-3">
                  {dictionary.insights.readMore}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
