"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Advantages accordion — rise + expand panels */
export function TsaAdvantages() {
  const dictionary = useDictionary();
  const baseId = useId();
  const reduced = useReducedMotion();
  const skip = reduced === true;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="why-invest"
      data-nav-surface="light"
      className="section-pad bg-[color:var(--bg-soft)]"
      aria-labelledby="why-invest-heading"
    >
      <div className="container-tsa">
        <Reveal effect="rise">
          <p className="label-act">{dictionary.whyInvest.label}</p>
          <h2
            id="why-invest-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.whyInvest.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-[color:var(--muted)]">
            {dictionary.whyInvest.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-10">
          <Reveal effect="blur" delay={0.06}>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
              {dictionary.whyInvest.quote}
            </p>
          </Reveal>
          <ul className="space-y-3">
            {dictionary.whyInvest.items.map((item, i) => {
              const open = openIndex === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-btn-${i}`;
              return (
                <Reveal key={item.title} effect="slideLeft" delay={i * 0.07}>
                  <li className="card-soft overflow-hidden bg-white">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] sm:px-6"
                      onClick={() => setOpenIndex(open ? null : i)}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-display text-sm font-bold text-[color:var(--accent)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg font-semibold text-[color:var(--ink)] md:text-xl">
                          {item.title}
                        </span>
                      </span>
                      <span
                        className="mt-1 shrink-0 font-display text-xl text-[color:var(--accent)]"
                        aria-hidden
                      >
                        {open ? "−" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          key="panel"
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={
                            skip
                              ? false
                              : { height: 0, opacity: 0.4 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={
                            skip
                              ? undefined
                              : { height: 0, opacity: 0.4 }
                          }
                          transition={{ duration: 0.32, ease }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed text-[color:var(--muted)] sm:px-6 md:text-base">
                            {item.body}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
