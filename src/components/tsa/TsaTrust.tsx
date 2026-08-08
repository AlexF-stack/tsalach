"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { motion, useReducedMotion } from "framer-motion";

export function TsaTrust() {
  const dictionary = useDictionary();
  const reduced = useReducedMotion();

  return (
    <section
      id="trust"
      data-nav-surface="light"
      data-tone="light"
      className="relative overflow-hidden bg-[color:var(--bg-soft)]"
      aria-label={dictionary.brand.footprint}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,146,20,0.1),transparent_65%)]"
      />

      <ul className="relative mx-auto grid max-w-[1240px] grid-cols-2 gap-3 px-4 py-8 min-[380px]:gap-4 min-[380px]:px-5 min-[380px]:py-10 min-[720px]:grid-cols-4 min-[900px]:px-6">
        {dictionary.trust.items.map((item, i) => (
          <motion.li
            key={item.label}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.55,
              delay: i * 0.06,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="card-soft group px-3 py-6 text-center transition-transform duration-300 hover:-translate-y-0.5 min-[380px]:px-4 min-[380px]:py-7"
          >
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
              {item.label}
            </p>
            <p className="font-display mt-3 text-[clamp(1.05rem,2.4vw,1.3rem)] font-bold leading-snug text-[color:var(--ink)]">
              {item.value}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
