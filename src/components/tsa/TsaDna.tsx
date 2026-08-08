"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function TsaDna() {
  const dictionary = useDictionary();
  const reduced = useReducedMotion();
  const skipMotion = reduced === true;

  return (
    <section
      id="dna"
      data-nav-surface="light"
      data-tone="light"
      className="section-pad bg-[color:var(--bg-soft)]"
      aria-labelledby="dna-heading"
    >
      <div className="container-tsa">
        <Reveal effect="blur">
          <p className="label-act">{dictionary.approach.label}</p>
          <h2
            id="dna-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.approach.label}
          </h2>
          <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
            {dictionary.approach.intro}
          </p>
        </Reveal>

        <ul className="-mx-1 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0 md:snap-none [&::-webkit-scrollbar]:hidden">
          {dictionary.approach.values.map((value, i) => (
            <motion.li
              key={value.title}
              className="card-soft group w-[min(17.5rem,78vw)] shrink-0 snap-start bg-white p-5 will-change-transform md:w-auto md:min-w-0"
              initial={skipMotion ? false : { opacity: 1, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: i * 0.09,
                ease,
              }}
              whileHover={
                skipMotion
                  ? undefined
                  : {
                      y: -8,
                      boxShadow:
                        "0 18px 40px rgba(11,11,11,0.1), 0 0 0 1px rgba(198,146,20,0.28)",
                      transition: { duration: 0.28, ease },
                    }
              }
            >
              <motion.span
                className="font-display inline-block text-2xl font-bold text-[color:var(--accent)]"
                initial={skipMotion ? false : { opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.12 + i * 0.09,
                  ease,
                }}
                whileHover={
                  skipMotion
                    ? undefined
                    : { scale: 1.08, transition: { duration: 0.2 } }
                }
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <h3 className="font-display mt-3 text-lg font-semibold text-[color:var(--ink)] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
                {value.title}
              </h3>
              <span
                aria-hidden
                className="mt-2 block h-0.5 w-0 bg-[color:var(--accent)] transition-all duration-300 ease-out group-hover:w-10"
              />
              {value.description ? (
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                  {value.description}
                </p>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
