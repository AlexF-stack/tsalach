"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: ReactNode };

export function GsapProvider({ children }: Props) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (reduced) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      return;
    }
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced]);

  return <>{children}</>;
}
