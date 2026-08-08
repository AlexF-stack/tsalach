"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function SiteSubsidiaries() {
  const dictionary = useDictionary();

  return (
    <section
      id="subsidiaries"
      data-nav-surface="light"
      className="section-pad border-y border-[color:var(--line)] bg-[color:var(--bg)]"
      aria-labelledby="subsidiaries-heading"
    >
      <div className="container-herna">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="label-act">{dictionary.subsidiaries.label}</p>
          <h2
            id="subsidiaries-heading"
            className="heading-display mt-4 text-display-md"
          >
            {dictionary.subsidiaries.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--muted)] md:text-lg">
            {dictionary.subsidiaries.intro}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {dictionary.subsidiaries.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05} className="h-full">
              <TiltCard intensity={8} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-elevated)] p-6 transition duration-500 hover:border-[color:var(--gold)]/40 hover:shadow-[0_16px_40px_rgba(10,14,26,0.1)]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[color:var(--gold)]/35 bg-[color:var(--navy-deep)] font-mono text-lg text-[color:var(--gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-5 font-display text-lg text-[color:var(--ink)] md:text-xl">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--gold-deep)]">
                    {item.sector}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {item.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-start gap-2 text-sm leading-relaxed text-[color:var(--muted)]"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold)]"
                          aria-hidden
                        />
                        {service}
                      </li>
                    ))}
                  </ul>
                  {"href" in item && item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold-deep)] transition-colors hover:text-[color:var(--gold)]"
                    >
                      {dictionary.subsidiaries.visitSite}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : null}
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="font-display text-base text-[color:var(--ink)] md:text-lg">
            {dictionary.subsidiaries.tagline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
