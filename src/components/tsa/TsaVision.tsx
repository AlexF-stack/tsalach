"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";

export function TsaVision() {
  const dictionary = useDictionary();

  return (
    <section
      id="identity"
      data-nav-surface="light"
      className="section-pad bg-white"
      aria-labelledby="identity-heading"
    >
      <div className="container-tsa">
        <Reveal>
          <p className="label-act">{dictionary.identity.label}</p>
          <h2
            id="identity-heading"
            className="heading-display mt-4 text-display-md"
          >
            {dictionary.identity.headline}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <Reveal delay={0.05}>
            <div className="card-soft h-full bg-white p-6 sm:p-8">
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                {dictionary.vision.label}
              </p>
              <p className="font-display mt-4 text-[clamp(1.45rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.02em] text-[color:var(--ink)]">
                {dictionary.visionHeadline}
              </p>
              <blockquote className="mt-6 rounded-[0.65rem] bg-[color:var(--accent-soft)] px-5 py-4 text-base leading-relaxed text-[color:var(--ink)]/75 italic md:text-lg">
                «{dictionary.vision.body}»
              </blockquote>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[color:var(--muted)] md:text-base">
                {dictionary.visionSupport}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-soft h-full bg-[color:var(--bg-soft)] p-6 sm:p-8">
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                {dictionary.mission.label}
              </p>
              <p className="font-display mt-4 text-xl font-semibold text-[color:var(--ink)] md:text-2xl">
                {dictionary.mission.body}
              </p>
              <ul className="mt-6 space-y-3" role="list">
                {dictionary.missionItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-[color:var(--ink)]/70 md:text-base"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10">
          <div className="card-soft bg-[color:var(--accent)] px-6 py-8 shadow-[0_16px_48px_var(--accent-glow)] sm:px-10">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">
              {dictionary.purpose.label}
            </p>
            <p className="font-display mt-3 text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-snug text-white">
              {dictionary.purpose.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
