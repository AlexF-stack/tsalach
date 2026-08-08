"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";

export function TsaProcess() {
  const dictionary = useDictionary();
  const reduced = useReducedMotion();
  const steps = dictionary.businessModel.steps;
  const [active, setActive] = useState(0);
  const current = steps[active] ?? steps[0];

  return (
    <section
      id="model"
      data-nav-surface="gold"
      data-tone="gold"
      className="section-pad section-gold"
      aria-labelledby="model-heading"
    >
      <div className="container-tsa">
        <Reveal>
          <p className="label-act">{dictionary.businessModel.label}</p>
          <h2
            id="model-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.businessModel.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-[color:var(--muted)]">
            {dictionary.businessModel.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div
            className="relative"
            role="tablist"
            aria-label={dictionary.businessModel.headline}
          >
            <ol className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible md:pb-0 md:snap-none [&::-webkit-scrollbar]:hidden">
              {steps.map((step, i) => {
                const selected = active === i;
                return (
                  <li
                    key={step.title}
                    className="w-[min(15.5rem,78vw)] shrink-0 snap-start md:w-auto"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="process-panel"
                      id={`process-tab-${i}`}
                      className={`group flex min-h-[7.5rem] w-full flex-col items-start gap-3 rounded-[0.85rem] p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] md:min-h-0 ${
                        selected
                          ? "bg-white shadow-[0_16px_48px_rgba(15,23,42,0.1)]"
                          : "bg-white/60 hover:bg-white hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
                      }`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => {
                        if (
                          !reduced &&
                          window.matchMedia("(pointer: fine)").matches
                        ) {
                          setActive(i);
                        }
                      }}
                    >
                      <span
                        className={`relative z-[1] flex h-9 w-9 items-center justify-center rounded-full font-display text-xs font-bold transition ${
                          selected
                            ? "bg-[color:var(--accent)] text-[color:var(--accent-ink)]"
                            : "bg-[color:var(--accent-soft)] text-[color:var(--accent)] group-hover:bg-[color:var(--accent)] group-hover:text-[color:var(--accent-ink)]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-sm font-semibold leading-snug md:min-h-[2.6rem] ${
                          selected
                            ? "text-[color:var(--ink)]"
                            : "text-[color:var(--ink)]/55"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div
            id="process-panel"
            role="tabpanel"
            aria-labelledby={`process-tab-${active}`}
            className="card-soft mt-8 bg-white p-6 sm:p-8"
          >
            <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {String(active + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold text-[color:var(--ink)]">
              {current.title}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[color:var(--muted)]">
              {current.body}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <p className="font-display max-w-3xl text-lg font-semibold italic text-[color:var(--ink)]">
            {dictionary.businessModel.quote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
