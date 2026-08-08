"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { visuals } from "@/content/visuals";
import Image from "next/image";

const SECTOR_VISUAL: Record<string, string> = {
  housing: visuals.housing,
  "public-facilities": visuals.building,
  "urban-infra": visuals.road,
  territorial: visuals.africa,
  "ppp-projects": visuals.meeting,
};

export function TsaSectors() {
  const dictionary = useDictionary();

  return (
    <section
      id="sectors"
      data-nav-surface="light"
      data-tone="light"
      className="section-pad bg-white"
      aria-labelledby="sectors-heading"
    >
      <div className="container-tsa">
        <Reveal>
          <p className="label-act">{dictionary.subsidiaries.label}</p>
          <h2
            id="sectors-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.subsidiaries.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-[color:var(--muted)]">
            {dictionary.subsidiaries.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {dictionary.subsidiaries.items.map((item, i) => {
            const src = SECTOR_VISUAL[item.id] ?? visuals.skyline;
            return (
              <Reveal key={item.id} delay={i * 0.04} className="h-full">
                <article className="card-soft flex h-full flex-col overflow-hidden bg-white transition hover:-translate-y-0.5">
                  <div className="relative aspect-[4/3] overflow-hidden img-theme-frame">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
                      quality={65}
                      className="img-theme object-cover"
                    />
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[color:var(--ink)]/70 to-transparent" />
                    <span className="absolute bottom-3 left-3 z-[2] font-display text-xs font-bold text-[color:var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-display text-base font-semibold text-[color:var(--ink)] sm:text-lg">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                      {item.services[0]}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12} className="mt-8 text-center">
          <p className="font-display text-sm text-[color:var(--muted)] md:text-base">
            {dictionary.subsidiaries.tagline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
