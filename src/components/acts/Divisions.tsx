"use client";

import { DivisionGlassCards } from "@/components/acts/DivisionGlassCards";
import { ChapterNumber } from "@/components/ui/ChapterNumber";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useDictionary } from "@/components/providers/LocaleProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SoftImage } from "@/shared/ui/SoftImage";
import { mq } from "@/shared/tokens";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

export function Divisions() {
  const dictionary = useDictionary();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { setPhase } = useExperience();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [desktopLayout, setDesktopLayout] = useState(false);
  const items = dictionary.divisions.items;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const phaseTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => setPhase("hidden"),
      onEnterBack: () => setPhase("hidden"),
    });

    return () => phaseTrigger.kill();
  }, [setPhase]);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!pin || !track || !section || reduced) return;

    const mm = gsap.matchMedia();

    mm.add(mq.desktopPin, () => {
      setDesktopLayout(true);
      gsap.set(track, { clearProps: "x" });

      const panels = gsap.utils.toArray<HTMLElement>(
        pin.querySelectorAll(".division-slide"),
      );
      if (panels.length < 2) return;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.9,
          start: "top top",
          end: () =>
            `+=${Math.max(track.scrollWidth - window.innerWidth, window.innerHeight * 2)}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              panels.length - 1,
              Math.round(self.progress * (panels.length - 1)),
            );
            setActive(idx);
          },
        },
      });

      panels.forEach((panel) => {
        const media = panel.querySelector(".division-media");
        const content = panel.querySelector(".division-content");
        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.14, rotateY: -10, z: -120 },
            {
              scale: 1,
              rotateY: 0,
              z: 0,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 85%",
                end: "left 25%",
                scrub: true,
              },
            },
          );
        }
        if (content) {
          gsap.fromTo(
            content,
            { y: 56, opacity: 0.15, rotateX: 6 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 70%",
                end: "left 35%",
                scrub: true,
              },
            },
          );
        }
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    mm.add(mq.mobileStack, () => {
      setDesktopLayout(false);
      gsap.set(track, { clearProps: "transform" });

      const panels = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".division-slide"),
      );

      panels.forEach((panel, i) => {
        const media = panel.querySelector(".division-media");
        const content = panel.querySelector(".division-content");

        ScrollTrigger.create({
          trigger: panel,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });

        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.1, y: 48 },
            {
              scale: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "top 15%",
                scrub: true,
              },
            },
          );
        }
        if (content) {
          gsap.fromTo(
            content,
            { y: 40, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 78%",
                end: "top 42%",
                scrub: 0.55,
              },
            },
          );
        }
      });
    });

    return () => mm.revert();
  }, [reduced, items.length]);

  return (
    <section
      ref={sectionRef}
      id="divisions"
      className="relative z-20"
      aria-labelledby="divisions-heading"
    >
      <div className="container-herna relative z-20 py-16 md:py-24">
        <ChapterNumber number="04" label={dictionary.divisions.sectionLabel} />
        <h2
          id="divisions-heading"
          className="heading-display mt-2 max-w-[18ch] text-display-md"
        >
          {dictionary.divisions.headline}
        </h2>
        <p className="mt-6 max-w-2xl text-body-lg text-text-gray">
          {dictionary.divisions.intro}
        </p>

        <div
          className="mt-10 flex gap-2"
          role="tablist"
          aria-label={dictionary.divisions.actLabel}
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className="h-1.5 max-w-16 flex-1 transition-colors duration-[600ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
              style={{
                backgroundColor:
                  active === i ? item.accent : "rgba(156,154,148,0.35)",
              }}
              onClick={() => {
                const panel = document.getElementById(`division-${item.id}`);
                panel?.scrollIntoView({
                  behavior: reduced ? "auto" : "smooth",
                });
              }}
            />
          ))}
        </div>
      </div>

      <DivisionGlassCards />

      <div ref={pinRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className={`division-track flex ${
            desktopLayout && !reduced
              ? "w-max flex-row will-change-transform"
              : "w-full flex-col"
          }`}
          style={{
            perspective: desktopLayout ? "1600px" : undefined,
            transformStyle: desktopLayout ? "preserve-3d" : undefined,
          }}
        >
          {items.map((division, index) => (
            <article
              key={division.id}
              id={`division-${division.id}`}
              className="division-slide relative flex h-[100svh] w-screen shrink-0 flex-col justify-end"
              aria-labelledby={`division-title-${division.id}`}
            >
              <div
                className="division-media absolute inset-0 -z-10 overflow-hidden"
                aria-hidden="true"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
              >
                <SoftImage
                  src={division.imageSrc}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                  wrapperClassName="absolute inset-0"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0.55) 42%, rgba(10,10,11,0.2) 72%),
                      linear-gradient(135deg, ${division.accent}40 0%, transparent 55%)
                    `,
                  }}
                />
              </div>

              <div className="division-content container-herna relative pb-20 pt-32">
                <p className="label-act mb-3">
                  {String(index + 1).padStart(2, "0")} —{" "}
                  {dictionary.divisions.actLabel}
                </p>
                <h3
                  id={`division-title-${division.id}`}
                  className="heading-display max-w-[14ch] text-display-lg"
                >
                  {division.title}
                </h3>
                <p className="mt-6 max-w-xl text-body-lg text-off-white/90">
                  {division.description}
                </p>
                <div
                  className="mt-8 h-px w-24"
                  style={{ backgroundColor: division.accent }}
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
