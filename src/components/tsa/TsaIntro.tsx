"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { visuals } from "@/content/visuals";
import Image from "next/image";

export function TsaIntro() {
  const dictionary = useDictionary();

  return (
    <section
      id="about"
      data-nav-surface="light"
      data-tone="light"
      className="section-pad bg-[color:var(--bg-soft)]"
      aria-labelledby="about-heading"
    >
      <div className="container-tsa">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label-act">
                {dictionary.leadership.label} {dictionary.leadership.headline}
              </p>
              <h2
                id="about-heading"
                className="heading-display mt-4 max-w-3xl text-display-md"
              >
                {dictionary.about.headline}
              </h2>
            </Reveal>

            <Reveal
              delay={0.06}
              className="mt-8 max-w-3xl space-y-5 sm:mt-10 sm:space-y-6"
            >
              {dictionary.leadership.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-[0.98rem] leading-relaxed text-[color:var(--muted)] md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="card-soft relative aspect-[4/5] overflow-hidden img-theme-frame sm:aspect-[5/6] lg:aspect-[4/5]">
              <Image
                src={visuals.building}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={70}
                className="img-theme object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--ink)]/85 to-transparent p-5 sm:p-6">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                  {dictionary.about.purposeLabel}
                </p>
                <p className="font-display mt-2 text-lg font-semibold text-white sm:text-xl">
                  {dictionary.about.purpose}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-14 sm:mt-16">
          <p className="label-act">{dictionary.identityCard.label}</p>
          <h3 className="heading-display mt-3 text-display-sm">
            {dictionary.identityCard.headline}
          </h3>
          <dl className="card-soft mt-8 overflow-hidden bg-white">
            {dictionary.identityCard.rows.map((row) => (
              <div
                key={row.element}
                className="grid gap-1 px-5 py-4 odd:bg-[color:var(--bg-soft)]/70 sm:grid-cols-[minmax(9rem,14rem)_1fr] sm:gap-6 sm:px-6"
              >
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                  {row.element}
                </dt>
                <dd className="font-display text-sm font-semibold text-[color:var(--ink)] sm:text-base">
                  {row.description}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
