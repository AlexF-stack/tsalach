"use client";

import { ActTitle } from "@/components/ui/ActTitle";
import { ChapterNumber } from "@/components/ui/ChapterNumber";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useDictionary } from "@/components/providers/LocaleProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function VisionActs() {
  const dictionary = useDictionary();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { setPhase } = useExperience();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const triggers: ScrollTrigger[] = [];
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setPhase("side"),
        onEnterBack: () => setPhase("side"),
      }),
    );

    if (!reduced) {
      gsap.utils.toArray<HTMLElement>(".statement-block").forEach((block) => {
        const text = block.querySelector(".statement-text");
        if (!text) return;
        gsap.fromTo(
          text,
          {
            y: 48,
            opacity: 0.05,
            clipPath: "inset(0 0 100% 0)",
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 36%",
              scrub: 0.7,
            },
          },
        );
      });
    }

    return () => triggers.forEach((t) => t.kill());
  }, [reduced, setPhase]);

  return (
    <div ref={wrapRef} className="relative z-20">
      <section
        id="about"
        className="statement-block relative z-20 py-24 md:py-32 lg:py-40"
        aria-labelledby="about-title"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(var(--gold-primary) 1px, transparent 1px), linear-gradient(90deg, var(--gold-primary) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at center, #000 20%, transparent 75%)",
          }}
        />
        <div className="container-herna grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ChapterNumber number="01" label={dictionary.about.label} />
            <h2
              id="about-title"
              className="heading-display max-w-[10ch] text-display-md"
            >
              {dictionary.about.label}
            </h2>
          </div>
          <p className="statement-text heading-display text-display-sm text-off-white lg:col-span-7 lg:pt-16">
            {dictionary.about.body}
          </p>
        </div>
      </section>

      <section
        id="vision"
        className="statement-block relative z-20 flex min-h-[85svh] items-center py-24"
        aria-labelledby="vision-title"
      >
        <div className="container-herna max-w-5xl">
          <ChapterNumber number="02" label={dictionary.vision.label} />
          <h2 id="vision-title" className="sr-only">
            {dictionary.vision.label}
          </h2>
          <blockquote className="statement-text heading-display max-w-[18ch] text-display-lg text-off-white">
            “{dictionary.vision.body}”
          </blockquote>
        </div>
      </section>

      <section
        id="mission"
        className="statement-block relative z-20 py-24 md:py-32"
        aria-labelledby="mission-title"
      >
        <div className="container-herna max-w-4xl">
          <ChapterNumber number="03" label={dictionary.mission.label} />
          <ActTitle label={dictionary.mission.label} />
          <h2 id="mission-title" className="sr-only">
            {dictionary.mission.label}
          </h2>
          <p className="statement-text heading-display mt-8 text-display-md text-off-white">
            {dictionary.mission.body}
          </p>
        </div>
      </section>
    </div>
  );
}
