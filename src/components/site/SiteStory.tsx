"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/site/Reveal";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Plane } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Flight path across the timeline (viewBox 0 0 1000 220). */
const JOURNEY_PATH =
  "M 80 150 C 220 40, 320 40, 500 130 S 780 220, 920 90";

const FLIGHT_MS = 7800;
const HOLD_MS = 1400;
const CYCLE_MS = FLIGHT_MS + HOLD_MS;

/** Precomputed stop ratios along the path (start / mid / end). */
const STOP_RATIOS = [0.02, 0.5, 0.98] as const;

export function SiteStory() {
  const dictionary = useDictionary();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25, once: false });

  const progress = useMotionValue(0);
  const planeX = useMotionValue(80);
  const planeY = useMotionValue(150);
  const planeRotate = useMotionValue(-20);
  const trailLength = useTransform(progress, [0, 1], [0, 1]);

  const [stops, setStops] = useState<{ x: number; y: number }[]>([
    { x: 80, y: 150 },
    { x: 500, y: 130 },
    { x: 920, y: 90 },
  ]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setStops(
      STOP_RATIOS.map((r) => {
        const p = path.getPointAtLength(r * len);
        return { x: p.x, y: p.y };
      }),
    );
    // Park plane at start when reduced motion
    if (reduced) {
      const p = path.getPointAtLength(0);
      planeX.set(p.x);
      planeY.set(p.y);
      progress.set(1);
    }
  }, [reduced, planeX, planeY, progress]);

  useAnimationFrame((time) => {
    if (reduced || !inView) return;
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    const cycle = time % CYCLE_MS;
    const t =
      cycle <= FLIGHT_MS ? easeInOutCubic(cycle / FLIGHT_MS) : 1;

    progress.set(t);
    const dist = t * len;
    const point = path.getPointAtLength(dist);
    const look = path.getPointAtLength(Math.min(dist + 2.5, len));
    const angle =
      (Math.atan2(look.y - point.y, look.x - point.x) * 180) / Math.PI;

    planeX.set(point.x);
    planeY.set(point.y);
    planeRotate.set(angle);
  });

  const items = dictionary.story.items;

  return (
    <section
      id="story"
      ref={sectionRef}
      data-nav-surface="light"
      className="section-pad relative overflow-hidden border-y border-[color:var(--line)] bg-[color:var(--bg-elevated)]"
      aria-labelledby="story-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--gold) 12%, transparent), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="container-herna relative">
        <Reveal className="max-w-2xl">
          <p className="label-act">{dictionary.story.label}</p>
          <h2
            id="story-heading"
            className="heading-display mt-4 text-display-md"
          >
            {dictionary.story.headline}
          </h2>
          <p className="mt-5 text-body-lg text-[color:var(--muted)]">
            {dictionary.story.body}
          </p>
        </Reveal>

        <div className="relative mt-12 md:mt-16">
          {/* Desktop flight path */}
          <div className="relative mx-auto hidden aspect-[1000/280] w-full max-w-5xl md:block">
            <svg
              viewBox="0 0 1000 220"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              <defs>
                <linearGradient
                  id="journeyGold"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8a6a2e" />
                  <stop offset="50%" stopColor="#c9a24b" />
                  <stop offset="100%" stopColor="#e8ce8a" />
                </linearGradient>
                <filter id="planeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow
                    dx="0"
                    dy="2"
                    stdDeviation="3"
                    floodColor="#c9a24b"
                    floodOpacity="0.45"
                  />
                </filter>
              </defs>

              {/* Ghost route */}
              <path
                d={JOURNEY_PATH}
                fill="none"
                stroke="color-mix(in srgb, var(--navy) 14%, transparent)"
                strokeWidth="2"
                strokeDasharray="7 11"
              />

              {/* Full path for length sampling (always complete) */}
              <path
                ref={pathRef}
                d={JOURNEY_PATH}
                fill="none"
                stroke="transparent"
                strokeWidth="2"
              />

              {/* Trail drawn behind the plane */}
              <motion.path
                d={JOURNEY_PATH}
                fill="none"
                stroke="url(#journeyGold)"
                strokeWidth="2.75"
                strokeLinecap="round"
                style={{ pathLength: reduced ? 1 : trailLength }}
              />

              {stops.map((pos, i) => (
                <JourneyBeacon
                  key={items[i]?.year ?? i}
                  x={pos.x}
                  y={pos.y}
                  label={items[i]?.year.slice(2) ?? ""}
                  progress={progress}
                  threshold={STOP_RATIOS[i] ?? 0}
                />
              ))}

              <motion.g
                style={{ x: planeX, y: planeY, rotate: planeRotate }}
                filter="url(#planeGlow)"
              >
                <circle
                  r="20"
                  fill="var(--navy-deep)"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                />
                {/* Nose points along path (CSS offsetRotate equivalent) */}
                <g transform="rotate(45)">
                  <path
                    d="M 12 0 L -8 -6 L -4 0 L -8 6 Z"
                    fill="var(--gold)"
                  />
                </g>
              </motion.g>
            </svg>
          </div>

          {/* Milestone captions — desktop */}
          <ol className="relative mt-2 hidden gap-6 md:mt-2 md:grid md:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.year} delay={0.08 * i}>
                <JourneyMilestone
                  item={item}
                  progress={progress}
                  threshold={STOP_RATIOS[i] ?? 0}
                  reduced={!!reduced}
                />
              </Reveal>
            ))}
          </ol>

          {/* Mobile vertical journey */}
          <div className="md:hidden">
            <MobileJourney items={items} reduced={!!reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function JourneyBeacon({
  x,
  y,
  label,
  progress,
  threshold,
}: {
  x: number;
  y: number;
  label: string;
  progress: ReturnType<typeof useMotionValue<number>>;
  threshold: number;
}) {
  const lit = useTransform(progress, (v) => (v >= threshold - 0.03 ? 1 : 0.4));
  const pulse = useTransform(progress, (v) =>
    v >= threshold - 0.03 && v <= threshold + 0.1 ? 1.2 : 1,
  );

  return (
    <motion.g style={{ opacity: lit, x, y, scale: pulse }}>
      <circle
        r="17"
        fill="var(--navy-deep)"
        stroke="var(--gold)"
        strokeWidth="1.5"
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--gold)"
        fontSize="12"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        {label}
      </text>
    </motion.g>
  );
}

function JourneyMilestone({
  item,
  progress,
  threshold,
  reduced,
}: {
  item: { year: string; title: string; body: string };
  progress: ReturnType<typeof useMotionValue<number>>;
  threshold: number;
  reduced: boolean;
}) {
  const highlight = useTransform(progress, (v) =>
    reduced || v >= threshold - 0.03 ? 1 : 0.4,
  );
  const lift = useTransform(progress, (v) =>
    !reduced && v >= threshold - 0.03 && v <= threshold + 0.14 ? -8 : 0,
  );

  return (
    <motion.li className="px-2 text-center" style={{ opacity: highlight, y: lift }}>
      <p className="font-display text-3xl tracking-tight text-[color:var(--gold)] md:text-4xl">
        {item.year}
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--navy-deep)]">
        {item.title}
      </p>
      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[color:var(--muted)]">
        {item.body}
      </p>
    </motion.li>
  );
}

function MobileJourney({
  items,
  reduced,
}: {
  items: { year: string; title: string; body: string }[];
  reduced: boolean;
}) {
  return (
    <div className="relative pl-12">
      <div
        className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-gradient-to-b from-[color:var(--gold)] via-[color:var(--gold)]/45 to-transparent"
        aria-hidden
      />
      <motion.div
        className="absolute left-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--navy-deep)] text-[color:var(--gold)] shadow-[0_8px_20px_rgba(10,14,26,0.25)]"
        animate={
          reduced
            ? { top: "0.75rem" }
            : { top: ["0.75rem", "calc(100% - 3rem)", "0.75rem"] }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.2,
        }}
      >
        <Plane className="h-4 w-4 rotate-90" strokeWidth={2} aria-hidden />
      </motion.div>

      <ol className="space-y-12">
        {items.map((item) => (
          <li key={item.year} className="relative">
            <span
              className="absolute -left-12 top-2 h-2.5 w-2.5 translate-x-[1.1rem] rounded-full bg-[color:var(--gold)] ring-4 ring-[color:var(--bg-elevated)]"
              aria-hidden
            />
            <p className="font-display text-2xl text-[color:var(--gold)]">
              {item.year}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--navy-deep)]">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
