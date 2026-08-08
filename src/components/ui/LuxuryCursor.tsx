"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEffect, useState } from "react";

/** Luxury soft-follow cursor — desktop only */
export function LuxuryCursor() {
  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!isDesktop || reduced) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(Boolean(t?.closest("a, button, [data-cursor-hover]")));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.classList.add("has-luxury-cursor");
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-luxury-cursor");
    };
  }, [isDesktop, reduced]);

  if (!isDesktop || reduced) return null;

  return (
    <div
      className="pointer-events-none fixed z-[200] mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${hover ? 2.2 : 1})`,
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      aria-hidden="true"
    >
      <span
        className="block rounded-full border border-white"
        style={{ width: 14, height: 14 }}
      />
    </div>
  );
}
