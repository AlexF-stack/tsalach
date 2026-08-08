"use client";

import { useEffect } from "react";

/**
 * Scroll to hash targets after navigating back to the home page
 * (e.g. /en#divisions from a division detail).
 */
export function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      const top =
        el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    scrollToHash();
    const t1 = window.setTimeout(scrollToHash, 120);
    const t2 = window.setTimeout(scrollToHash, 450);
    const t3 = window.setTimeout(scrollToHash, 900);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
