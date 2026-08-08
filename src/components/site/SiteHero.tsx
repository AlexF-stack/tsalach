"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { CinematicMedia } from "@/components/site/CinematicMedia";
import { brandAssets } from "@/content/brand";
import { motion, useReducedMotion } from "framer-motion";

const HERO_IMAGES = ["/media/hero-poster.jpg", "/media/hero-b-poster.jpg"];

const HERO_VIDEOS = ["/media/hero.mp4", "/media/hero-b.mp4"];

export function SiteHero() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const reduced = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="hero"
      data-nav-surface="hero"
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-title"
    >
      <CinematicMedia
        videoSrcs={HERO_VIDEOS}
        posterSrc="/media/hero-poster.jpg"
        images={HERO_IMAGES}
        kenBurns
        cycleMs={6500}
        videoCycleMs={14000}
      />

      <div className="container-herna relative z-10 flex min-h-[100svh] flex-col justify-end pb-14 pt-28 sm:pb-16 sm:pt-32 md:justify-center md:pb-24 md:pt-28">
        <div className="max-w-4xl">
          <motion.p
            className="label-act mb-4 text-white/90 sm:mb-6"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            {brandAssets.fullName}
          </motion.p>
          <motion.h1
            id="hero-title"
            className="font-display text-[clamp(2.4rem,9.5vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-white"
            initial={reduced ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease, delay: 0.22 }}
          >
            {brandAssets.holdingName}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-3xl font-display text-[clamp(1.35rem,4.2vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white/90 sm:mt-5"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.32 }}
          >
            <span className="block">{dictionary.hero.line1}</span>
            <span className="mt-1 block text-white/80">{dictionary.hero.line2}</span>
          </motion.p>
          <motion.p
            className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-white/72 sm:mt-7 sm:text-[1.05rem] md:mt-8 md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.42 }}
          >
            {dictionary.hero.subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.55 }}
          >
            <a
              href={`/${locale}#divisions`}
              className="btn-primary"
              data-cursor-hover
            >
              {dictionary.hero.primaryCta}
            </a>
            <a
              href={`/${locale}#about`}
              data-cursor-hover
              className="text-sm font-medium tracking-wide text-white/75 underline-offset-4 transition hover:text-white hover:underline"
            >
              {dictionary.hero.secondaryCta}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:bottom-8 md:block">
        <span className="scroll-cue" aria-hidden />
      </div>
    </section>
  );
}
