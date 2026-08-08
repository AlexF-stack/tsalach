"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

/** Act III — sphere grows full-screen (fade/scale via phase), then reveals divisions */
export function Transformation() {
  const ref = useRef<HTMLElement>(null);
  const { setPhase } = useExperience();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => setPhase("fullscreen"),
      onEnterBack: () => setPhase("fullscreen"),
    });

    return () => st.kill();
  }, [setPhase]);

  return (
    <section
      ref={ref}
      id="transformation"
      className="relative z-20 flex min-h-[70vh] items-center"
      aria-hidden="true"
    >
      <div className="container-herna w-full opacity-0">
        <span>Transformation</span>
      </div>
    </section>
  );
}
