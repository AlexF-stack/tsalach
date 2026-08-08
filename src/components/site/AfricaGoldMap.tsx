"use client";

import type { Locale } from "@/i18n/config";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  locale: Locale;
  className?: string;
};

/** Transparent Africa map — gold outlines, Gabon + pin embedded in SVG. */
export function AfricaGoldMap({ locale, className = "" }: Props) {
  const reduced = useReducedMotion();
  const title = locale === "fr" ? "GABON" : "GABON";
  const tagline = locale === "fr" ? "Notre base" : "Our home base";
  const presence =
    locale === "fr" ? "Présence internationale" : "International presence";

  return (
    <div
      className={`relative flex aspect-[16/11] items-center justify-center overflow-visible ${className}`}
    >
      <motion.div
        className="group relative h-full w-full max-w-[30rem]"
        initial={reduced ? false : { opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={reduced ? undefined : { scale: 1.06 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/africa-map.svg"
          alt={
            locale === "fr"
              ? "Carte de l'Afrique — TSALACH, Libreville, Gabon"
              : "Map of Africa — TSALACH, Libreville, Gabon"
          }
          className="h-full w-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] drop-shadow-[0_18px_40px_rgba(201,162,75,0.28)]"
          draggable={false}
        />
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--bg-elevated)]/90 px-3 py-1.5 backdrop-blur-sm">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[color:var(--gold-deep)]">
          {presence}
        </p>
      </div>

      <div className="pointer-events-none absolute left-0 top-[18%] max-w-[10rem] sm:max-w-[12rem]">
        <p className="font-display text-xl tracking-[0.08em] text-[color:var(--gold-deep)] sm:text-2xl">
          {title}
        </p>
        <p className="mt-1 text-[0.68rem] leading-snug text-[color:var(--muted)] sm:text-xs">
          {tagline}
        </p>
      </div>
    </div>
  );
}
