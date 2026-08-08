"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useState } from "react";

type Value = {
  title: string;
  description: string | null;
};

type Props = {
  label: string;
  intro: string;
  values: Value[];
  hint: string;
};

const ACCENTS = [
  "var(--gold)",
  "var(--navy-deep)",
  "var(--gold-soft)",
  "var(--navy)",
  "var(--gold-deep)",
];

/** Seconds for one full orbit. */
const ORBIT_PERIOD = 42;

function splitOrbitLabel(title: string): [string, string?] {
  const words = title.trim().split(/\s+/);
  if (words.length < 2 || title.length <= 14) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function orbitTextClass(title: string) {
  if (title.length > 22) {
    return "text-[0.5rem] leading-[1.05] sm:text-[0.56rem]";
  }
  if (title.length > 14) {
    return "text-[0.56rem] leading-[1.08] sm:text-[0.62rem]";
  }
  return "text-[0.64rem] leading-[1.12] sm:text-[0.72rem]";
}

export function ApproachOrbit({ label, intro, values, hint }: Props) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const paused = reduced || active !== null;

  const angle = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (paused) return;
    angle.set(angle.get() + (delta / 1000) * (360 / ORBIT_PERIOD));
  });

  const orbitRotate = useTransform(angle, (v) => `${v % 360}deg`);
  const counterRotate = useTransform(angle, (v) => `${-(v % 360)}deg`);

  const activate = (i: number) => setActive(i);
  const deactivate = () => setActive(null);

  return (
    <div id="approach" className="relative">
      <p className="mb-6 text-center text-[0.78rem] text-[color:var(--muted)] sm:mb-8">
        {hint}
      </p>

      <div className="relative mx-auto aspect-square w-full max-w-[min(100%,42rem)]">
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--blue) 14%, transparent), transparent 68%)",
          }}
          aria-hidden
        />

        {/* Decorative rings — independent slow spin */}
        <motion.div
          className="pointer-events-none absolute inset-[14%] rounded-full border border-dashed border-[color:var(--blue)]/25"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute inset-[4%] rounded-full border border-[color:var(--line)]"
          animate={reduced ? undefined : { rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />

        {/* Fixed center hub */}
        <div
          className="pointer-events-none absolute inset-[30%] z-10 flex flex-col items-center justify-center overflow-hidden rounded-full border border-[color:var(--line)] bg-[color:var(--bg-elevated)]/95 px-4 text-center shadow-[0_20px_50px_rgba(22,48,72,0.1)] backdrop-blur-md sm:inset-[28%] sm:px-6"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            {active === null ? (
              <motion.div
                key="idle"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-full overflow-hidden px-1"
              >
                <p className="label-act">{label}</p>
                <p className="mt-2 line-clamp-4 text-[0.7rem] leading-snug text-[color:var(--muted)] sm:line-clamp-5 sm:text-[0.78rem]">
                  {intro}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`center-${values[active].title}`}
                initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-full overflow-hidden px-1"
              >
                <p className="font-display text-[clamp(0.85rem,2.4vw,1.15rem)] uppercase leading-tight tracking-wide text-[color:var(--ink)]">
                  {values[active].title}
                </p>
                {values[active].description ? (
                  <p className="mt-2 line-clamp-5 text-[0.68rem] leading-snug text-[color:var(--muted)] sm:line-clamp-6 sm:text-[0.75rem]">
                    {values[active].description}
                  </p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Orbiting values — full titles, continuous rotation */}
        <motion.ul
          className="absolute inset-0 z-20 list-none"
          role="list"
          style={{ rotate: orbitRotate }}
        >
          {values.map((value, i) => {
            const a = (i / values.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 42;
            const x = 50 + radius * Math.cos(a);
            const y = 50 + radius * Math.sin(a);
            const accent = ACCENTS[i % ACCENTS.length];
            const isActive = active === i;
            const [line1, line2] = splitOrbitLabel(value.title);

            return (
              <li
                key={value.title}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isActive ? 30 : 5,
                }}
                onMouseEnter={() => activate(i)}
                onMouseLeave={deactivate}
              >
                {/* Counter-rotate so labels stay upright while orbiting */}
                <motion.div style={{ rotate: counterRotate }}>
                  <motion.button
                    type="button"
                    aria-pressed={isActive}
                    aria-label={
                      value.description
                        ? `${value.title}. ${value.description}`
                        : value.title
                    }
                    className="relative flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full border border-white/70 px-1 text-center shadow-[0_12px_28px_rgba(22,48,72,0.16)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] sm:h-[7.25rem] sm:w-[7.25rem]"
                    style={{
                      background: `radial-gradient(circle at 32% 28%, white 0%, color-mix(in srgb, ${accent} 22%, white) 45%, color-mix(in srgb, ${accent} 38%, white) 100%)`,
                    }}
                    initial={reduced ? false : { scale: 0.7, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1.18 : 1,
                      opacity: 1,
                    }}
                    whileHover={reduced ? undefined : { scale: 1.22 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    onFocus={() => activate(i)}
                    onBlur={deactivate}
                    onClick={() => setActive(isActive ? null : i)}
                    data-cursor-hover
                  >
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full opacity-40"
                      style={{
                        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 45%, transparent), 0 0 24px color-mix(in srgb, ${accent} 35%, transparent)`,
                      }}
                      aria-hidden
                    />
                    <span
                      className={`relative z-[1] max-w-[5.4rem] px-1 font-display font-semibold uppercase tracking-wide text-[color:var(--ink)] sm:max-w-[6rem] ${orbitTextClass(value.title)}`}
                    >
                      {line1}
                      {line2 ? (
                        <>
                          <br />
                          {line2}
                        </>
                      ) : null}
                    </span>
                  </motion.button>
                </motion.div>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}
