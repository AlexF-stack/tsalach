"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  "#hero",
  "#about",
  "#vision",
  "#mission",
  "#divisions",
  "#approach",
  "#partners",
  "#contact",
];

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-gold-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
      <nav className="pointer-events-auto absolute right-3 top-3 hidden flex-col gap-1.5 md:flex">
        {SECTIONS.map((href) => (
          <a
            key={href}
            href={href}
            className="block h-1.5 w-1.5 rounded-full bg-[color:var(--text-gray)]/50 transition-colors hover:bg-gold-primary"
            aria-label={href.slice(1)}
          />
        ))}
      </nav>
    </div>
  );
}
