"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/** Refresh ScrollTrigger after layout shifts */
export function useScrollTriggerRefresh(deps: unknown[] = []) {
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
