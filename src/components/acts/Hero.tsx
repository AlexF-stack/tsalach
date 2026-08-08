"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";
import { useDictionary } from "@/components/providers/LocaleProvider";
import { Button } from "@/shared/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { brandAssets } from "@/content/brand";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function Hero() {
  const dictionary = useDictionary();
  const ref = useRef<HTMLElement>(null);
  const { setPhase, introComplete } = useExperience();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!introComplete || reduced) {
      if (reduced) setPhase("hero");
      return;
    }
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom center",
      onEnter: () => setPhase("hero"),
      onEnterBack: () => setPhase("hero"),
    });

    return () => st.kill();
  }, [introComplete, reduced, setPhase]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative z-20 flex min-h-[100svh] flex-col items-center justify-end pb-14 pt-28 sm:pb-16 sm:pt-32"
      aria-labelledby="hero-title"
    >
      <div className="container-herna relative z-20 flex w-full flex-col items-center text-center">
        <p className="label-act mb-5">{dictionary.hero.actLabel}</p>
        <h1
          id="hero-title"
          className="heading-display text-display-xl leading-[0.95]"
        >
          <span className="block">HERITAGE</span>
          <span className="block">OF</span>
          <span className="block">NATIONS</span>
        </h1>
        <p className="sr-only">{brandAssets.fullName}</p>
        <p className="mt-8 max-w-[22ch] whitespace-pre-line text-body-lg text-text-gray sm:mt-10">
          {dictionary.brand.tagline}
        </p>
        <Button href="#about" className="mt-10">
          {dictionary.ui.explore}
        </Button>
        <a
          href="#about"
          className="mt-12 inline-flex flex-col items-center gap-3 text-text-gray focus-visible:outline-none sm:mt-14"
          aria-label={dictionary.nav.find((n) => n.href === "#about")?.label}
        >
          <ScrollIndicator />
        </a>
      </div>
    </section>
  );
}
