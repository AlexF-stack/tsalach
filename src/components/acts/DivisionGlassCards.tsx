"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { HardHat, Leaf, Mountain, Building2, Zap } from "lucide-react";
import { useRef } from "react";
import type { MouseEvent } from "react";

const ICONS = {
  equipment: HardHat,
  mining: Mountain,
  agriculture: Leaf,
  energy: Zap,
  "real-estate": Building2,
} as const;

export function DivisionGlassCards() {
  const dictionary = useDictionary();
  const gridRef = useRef<HTMLUListElement>(null);

  const onMove = (e: MouseEvent<HTMLLIElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  };

  const onLeave = (e: MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
  };

  return (
    <div className="container-herna relative z-20 pb-10 md:pb-16">
      <ul
        ref={gridRef}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
        style={{ perspective: "1200px" }}
      >
        {dictionary.divisions.items.map((item) => {
          const Icon =
            ICONS[item.id as keyof typeof ICONS] ?? HardHat;
          return (
            <li
              key={item.id}
              className="division-glass-card glass-panel group relative overflow-hidden p-6 md:p-7"
              data-cursor-hover
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[600ms] ease-out group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${item.accent}55, transparent 60%)`,
                }}
              />
              <Icon
                className="relative mb-5 h-5 w-5 text-gold-primary"
                aria-hidden
              />
              <a
                href={`#division-${item.id}`}
                className="relative block"
              >
                <h3 className="heading-display text-lg leading-tight md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-gray">
                  {item.description}
                </p>
              </a>
              <div
                className="relative mt-5 h-px w-10"
                style={{ backgroundColor: item.accent }}
                aria-hidden
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
