"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { MagneticButton } from "@/components/tsa/MagneticButton";
import { brandAssets } from "@/content/brand";
import { visuals } from "@/content/visuals";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
/** Never start at opacity 0 — avoids empty hero if animation stalls. */
const rise: Variants = {
  hidden: { opacity: 1, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const COLLAGE = [
  {
    src: visuals.construction,
    delay: 0,
    area: "1 / 1 / 6 / 8",
  },
  {
    src: visuals.meeting,
    delay: 0.08,
    area: "1 / 8 / 5 / 13",
  },
  {
    src: visuals.civil,
    delay: 0.14,
    area: "6 / 1 / 11 / 6",
  },
  {
    src: visuals.building,
    delay: 0.2,
    area: "5 / 6 / 11 / 13",
  },
] as const;

export function TsaHero() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  /** Only skip motion when reduced-motion is explicitly on; null still animates. */
  const skipMotion = reduced === true;
  const [showCollage, setShowCollage] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setShowCollage(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="hero"
      data-nav-surface="hero"
      data-tone="light"
      className="relative min-h-[100svh] overflow-hidden bg-[color:var(--ink)]"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed visual plane */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={visuals.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={65}
          className="img-theme object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(11,11,11,0.92)_0%,rgba(11,11,11,0.78)_42%,rgba(11,11,11,0.48)_70%,rgba(11,11,11,0.38)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(198,146,20,0.32),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1240px] items-center gap-8 px-5 pb-20 pt-24 min-[480px]:pb-16 min-[480px]:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-6 lg:pb-20 lg:pt-32">
        <motion.div
          variants={skipMotion ? undefined : container}
          initial={skipMotion ? false : "hidden"}
          animate={skipMotion ? undefined : "show"}
        >
          <motion.div
            variants={skipMotion ? undefined : rise}
            className="mb-4 min-[480px]:mb-6"
          >
            <p className="font-display text-[1.35rem] font-bold tracking-[0.1em] text-white min-[380px]:text-2xl min-[380px]:tracking-[0.12em] sm:text-3xl sm:tracking-[0.14em]">
              {brandAssets.name}
              <span className="ml-1.5 text-[color:var(--accent)] min-[380px]:ml-2">
                S.A.
              </span>
            </p>
          </motion.div>

          <motion.p
            variants={skipMotion ? undefined : rise}
            className="mb-3 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-[color:var(--accent)]/20 px-3 py-1.5 text-[0.62rem] font-bold uppercase leading-snug tracking-[0.1em] text-[color:var(--accent)] ring-1 ring-[color:var(--accent)]/35 min-[380px]:mb-4 min-[380px]:px-3.5 min-[380px]:text-[0.72rem]"
          >
            {dictionary.hero.actLabel}
          </motion.p>

          <motion.p
            variants={skipMotion ? undefined : rise}
            className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/65 min-[380px]:text-[0.78rem]"
          >
            {brandAssets.presence[locale]}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={skipMotion ? undefined : rise}
            className="font-display text-[clamp(2.15rem,8.2vw,4.75rem)] font-bold leading-[0.96] tracking-[-0.035em] text-white"
          >
            {dictionary.hero.line1}
            <span className="mt-1 block text-[color:var(--accent)]">
              {dictionary.hero.line2}
            </span>
          </motion.h1>

          <motion.p
            variants={skipMotion ? undefined : rise}
            className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-white/75 min-[480px]:mt-6 md:text-lg"
          >
            {dictionary.hero.subtitle}
          </motion.p>

          {/* Mobile / tablet visual strip — second photo so the first viewport is never text-only */}
          <motion.div
            variants={skipMotion ? undefined : rise}
            className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[0.85rem] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/15 lg:hidden img-theme-frame"
          >
            <Image
              src={visuals.workers}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 0px"
              quality={60}
              className="img-theme object-cover"
            />
          </motion.div>

          <motion.div
            variants={skipMotion ? undefined : rise}
            className="mt-6 flex flex-col gap-3 min-[420px]:mt-8 min-[420px]:flex-row min-[420px]:flex-wrap"
          >
            <MagneticButton
              href={`/${locale}#objet`}
              className="btn-primary min-h-12 w-full min-[420px]:w-auto"
            >
              {dictionary.hero.primaryCta}
            </MagneticButton>
            <MagneticButton
              href={`/${locale}#contact`}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[0.65rem] border border-white/35 bg-white/10 px-6 text-[0.92rem] font-bold text-white backdrop-blur-sm transition hover:bg-white/20 min-[420px]:w-auto"
            >
              {dictionary.hero.secondaryCta}
            </MagneticButton>
          </motion.div>
        </motion.div>

        {showCollage ? (
          <motion.aside
            className="relative mx-auto h-[min(68vh,560px)] w-full max-w-[520px]"
            initial={skipMotion ? false : { opacity: 1, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease }}
            aria-hidden
          >
            <div className="grid h-full grid-cols-12 grid-rows-10 gap-3">
              {COLLAGE.map((card, idx) => (
                <motion.div
                  key={card.src + card.area}
                  className="relative z-[1] min-h-0 overflow-hidden rounded-[0.85rem] shadow-[0_16px_48px_rgba(0,0,0,0.4)] ring-1 ring-white/20 img-theme-frame"
                  style={{ gridArea: card.area }}
                  initial={skipMotion ? false : { opacity: 1, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + card.delay,
                    ease,
                  }}
                >
                  <Image
                    src={card.src}
                    alt=""
                    fill
                    sizes="28vw"
                    quality={55}
                    className="img-theme object-cover"
                    priority={idx === 0}
                    loading={idx === 0 ? undefined : "lazy"}
                  />
                </motion.div>
              ))}
            </div>
          </motion.aside>
        ) : null}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[color:var(--ink)]/70 backdrop-blur-md">
        <p className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/70 lg:px-6">
          {dictionary.brand.footprint.split("•").map((item, i) => (
            <span key={item.trim()} className="inline-flex items-center gap-3">
              {i > 0 ? (
                <span className="text-[color:var(--accent)]">·</span>
              ) : null}
              {item.trim()}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
