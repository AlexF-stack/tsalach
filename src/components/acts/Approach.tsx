"use client";

import { ChapterNumber } from "@/components/ui/ChapterNumber";
import { useDictionary } from "@/components/providers/LocaleProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function Approach() {
  const dictionary = useDictionary();
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(".value-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 32, opacity: 0.15, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 45%",
            scrub: 0.5,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => Array.from(items).includes(t.trigger as Element))
        .forEach((t) => t.kill());
    };
  }, [reduced, dictionary.approach.values]);

  return (
    <section
      ref={ref}
      id="approach"
      className="relative z-20 py-24 md:py-32"
      aria-labelledby="approach-heading"
      style={{ perspective: "1000px" }}
    >
      <div className="container-herna">
        <ChapterNumber number="05" label={dictionary.approach.label} />
        <h2 id="approach-heading" className="sr-only">
          {dictionary.approach.label}
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {dictionary.approach.values.map((value) => (
            <li
              key={value.title}
              className="value-item glass-panel p-8 md:p-10"
              data-cursor-hover
            >
              <h3 className="heading-display text-display-sm">{value.title}</h3>
              {value.description ? (
                <p className="mt-4 text-body-lg text-text-gray">
                  {value.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
