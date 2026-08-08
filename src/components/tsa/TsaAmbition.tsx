"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { visuals } from "@/content/visuals";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

export function TsaAmbition() {
  const dictionary = useDictionary();
  const reduced = useReducedMotion();
  const skipMotion = reduced === true;

  return (
    <section
      id="story"
      data-nav-surface="light"
      data-tone="light"
      className="relative overflow-hidden section-pad"
      aria-labelledby="story-heading"
    >
      {/* Full-bleed plane + strong wash so cards stay readable */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={visuals.ambition}
          alt=""
          fill
          sizes="100vw"
          quality={65}
          className="img-theme object-cover object-center"
        />
        <div className="absolute inset-0 bg-[color:var(--bg-soft)]/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(198,146,20,0.14),transparent_55%)]" />
      </div>

      <div className="container-tsa relative z-10">
        <Reveal effect="rise">
          <p className="label-act">{dictionary.story.label}</p>
          <h2
            id="story-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.story.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-[color:var(--muted)]">
            {dictionary.story.body}
          </p>
        </Reveal>

        <ol className="mt-14 grid list-none gap-4 p-0 md:grid-cols-3 md:gap-5">
          {dictionary.story.items.map((item, i) => (
            <motion.li
              key={item.title}
              className="h-full"
              initial={skipMotion ? false : { opacity: 1, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={
                skipMotion
                  ? undefined
                  : {
                      y: -6,
                      transition: { duration: 0.25, ease },
                    }
              }
            >
              <article className="card-soft grid h-full grid-rows-[auto_minmax(3.5rem,auto)_1fr] gap-0 bg-white p-6 sm:p-7">
                <span className="font-display text-3xl font-bold leading-none text-[color:var(--accent)]">
                  {item.year}
                </span>
                <h3 className="font-display mt-4 text-xl font-semibold leading-snug text-[color:var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink)]/70">
                  {item.body}
                </p>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
