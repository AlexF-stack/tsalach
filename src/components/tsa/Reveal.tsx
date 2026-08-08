"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

export type RevealEffect =
  | "rise"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "blur"
  | "clip"
  | "soft";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distinct entrance motion — never traps content at opacity 0. */
  effect?: RevealEffect;
  amount?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const INITIAL: Record<RevealEffect, TargetAndTransition> = {
  rise: { opacity: 1, y: 28 },
  slideLeft: { opacity: 1, x: 48 },
  slideRight: { opacity: 1, x: -48 },
  scale: { opacity: 1, scale: 0.92, y: 12 },
  /** Lightweight substitute — real CSS blur tanks scroll performance */
  blur: { opacity: 1, y: 22, scale: 0.98 },
  clip: {
    opacity: 1,
    clipPath: "inset(8% 4% 8% 4%)",
    y: 16,
  },
  soft: { opacity: 0.55, y: 20 },
};

const VISIBLE: Record<RevealEffect, TargetAndTransition> = {
  rise: { opacity: 1, y: 0 },
  slideLeft: { opacity: 1, x: 0 },
  slideRight: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1, y: 0 },
  blur: { opacity: 1, y: 0, scale: 1 },
  clip: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
  },
  soft: { opacity: 1, y: 0 },
};

const DURATION: Record<RevealEffect, number> = {
  rise: 0.6,
  slideLeft: 0.7,
  slideRight: 0.7,
  scale: 0.65,
  blur: 0.75,
  clip: 0.8,
  soft: 0.55,
};

/** Viewport reveal with interchangeable entrance effects. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  effect = "rise",
  amount = 0.12,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced === true) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={INITIAL[effect]}
      whileInView={VISIBLE[effect]}
      viewport={{ once: true, amount, margin: "0px 0px -48px 0px" }}
      transition={{
        duration: DURATION[effect],
        delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
