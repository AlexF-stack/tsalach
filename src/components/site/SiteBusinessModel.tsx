"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/site/Reveal";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AUTO_MS = 3400;
const RING_R = 168;
const VIEW = 420;
const CX = VIEW / 2;
const CY = VIEW / 2;

function polar(i: number, total: number, r = RING_R) {
  const a = -Math.PI / 2 + (i / total) * Math.PI * 2;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

export function SiteBusinessModel() {
  const dictionary = useDictionary();
  const reduced = useReducedMotion();
  const steps = dictionary.businessModel.steps;
  const total = steps.length;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: false });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hold = useRef(0);

  const markerProgress = useMotionValue(0);
  const markerX = useTransform(markerProgress, (t) => {
    const a = -Math.PI / 2 + t * Math.PI * 2;
    return CX + RING_R * Math.cos(a);
  });
  const markerY = useTransform(markerProgress, (t) => {
    const a = -Math.PI / 2 + t * Math.PI * 2;
    return CY + RING_R * Math.sin(a);
  });

  useEffect(() => {
    const target = active / total;
    if (reduced) {
      markerProgress.set(target);
      return;
    }
    const current = markerProgress.get();
    // Always travel forward on the ring (5 → 0 wraps via 1)
    const forwardTarget =
      active === 0 && current > 0.5 ? 1 : target;

    const controls = animate(markerProgress, forwardTarget, {
      type: "spring",
      stiffness: 90,
      damping: 18,
      onComplete: () => {
        if (forwardTarget === 1) markerProgress.set(0);
      },
    });
    return () => controls.stop();
  }, [active, total, reduced, markerProgress]);

  useAnimationFrame((_, delta) => {
    if (reduced || !inView || paused) return;
    hold.current += delta;
    if (hold.current < AUTO_MS) return;
    hold.current = 0;
    setActive((prev) => (prev + 1) % total);
  });

  const select = (i: number) => {
    setActive(i);
    hold.current = 0;
  };

  return (
    <section
      id="model"
      ref={sectionRef}
      data-nav-surface="light"
      className="section-pad relative overflow-hidden border-y border-[color:var(--line)] bg-[color:var(--bg)]"
      aria-labelledby="model-heading"
    >
      <div className="container-herna relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-act">{dictionary.businessModel.label}</p>
          <h2
            id="model-heading"
            className="heading-display mt-4 text-display-md"
          >
            {dictionary.businessModel.headline}
          </h2>
          <p className="mt-5 text-body-lg text-[color:var(--muted)]">
            {dictionary.businessModel.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="relative mx-auto w-full max-w-[26rem] lg:col-span-6 lg:max-w-none">
            <div
              className="relative mx-auto aspect-square w-full max-w-[26rem]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <svg
                viewBox={`0 0 ${VIEW} ${VIEW}`}
                className="h-full w-full overflow-visible"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id="cycleRing"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8a6a2e" />
                    <stop offset="55%" stopColor="#c9a24b" />
                    <stop offset="100%" stopColor="#1a2433" />
                  </linearGradient>
                </defs>

                <circle
                  cx={CX}
                  cy={CY}
                  r={RING_R}
                  fill="none"
                  stroke="color-mix(in srgb, var(--navy) 12%, transparent)"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={RING_R}
                  fill="none"
                  stroke="url(#cycleRing)"
                  strokeWidth="2.25"
                  strokeOpacity="0.85"
                />

                {steps.map((step, i) => {
                  const { x, y } = polar(i, total);
                  const on = active === i;
                  return (
                    <g key={step.title}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        fill={on ? "var(--navy-deep)" : "var(--bg-elevated)"}
                        stroke={on ? "var(--gold)" : "var(--line)"}
                        strokeWidth={on ? 2 : 1}
                        initial={false}
                        animate={{ r: on ? 22 : 14 }}
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 22,
                        }}
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={on ? "var(--gold)" : "var(--muted)"}
                        fontSize={on ? 12 : 10}
                        fontFamily="ui-monospace, monospace"
                        style={{ pointerEvents: "none" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </text>
                      <circle
                        cx={x}
                        cy={y}
                        r={28}
                        fill="transparent"
                        className="cursor-pointer"
                        onClick={() => select(i)}
                      />
                    </g>
                  );
                })}

                <motion.g style={{ x: markerX, y: markerY }}>
                  <circle r="7" fill="var(--gold)" />
                  <circle
                    r="14"
                    fill="none"
                    stroke="var(--gold)"
                    strokeOpacity="0.35"
                  />
                </motion.g>
              </svg>

              <div className="pointer-events-none absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--bg-elevated)]/95 px-6 text-center shadow-[0_20px_50px_rgba(10,14,26,0.08)] backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={steps[active].title}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--gold)]">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-display text-lg leading-snug text-[color:var(--ink)] sm:text-xl">
                      {steps[active].title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <ol className="space-y-1">
              {steps.map((step, i) => {
                const on = active === i;
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      onFocus={() => {
                        setPaused(true);
                        select(i);
                      }}
                      onBlur={() => setPaused(false)}
                      onMouseEnter={() => {
                        setPaused(true);
                        select(i);
                      }}
                      onMouseLeave={() => setPaused(false)}
                      className={`group flex w-full gap-4 rounded-xl px-3 py-4 text-left transition duration-500 sm:gap-5 sm:px-4 ${
                        on
                          ? "bg-[color:var(--navy-deep)] text-white"
                          : "hover:bg-[color:var(--bg-elevated)]"
                      }`}
                      aria-current={on ? "step" : undefined}
                      data-cursor-hover
                    >
                      <span className="mt-0.5 font-mono text-sm tabular-nums text-[color:var(--gold)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-base sm:text-lg ${
                            on ? "text-white" : "text-[color:var(--ink)]"
                          }`}
                        >
                          {step.title}
                        </span>
                        <span
                          className={`mt-1.5 block text-sm leading-relaxed ${
                            on ? "text-white/70" : "text-[color:var(--muted)]"
                          }`}
                        >
                          {step.body}
                        </span>
                      </span>
                      <motion.span
                        className={`mt-2 hidden h-2 w-2 shrink-0 rounded-full sm:block ${
                          on ? "bg-[color:var(--gold)]" : "bg-transparent"
                        }`}
                        animate={
                          on && !reduced
                            ? { scale: [1, 1.35, 1] }
                            : { scale: 1 }
                        }
                        transition={{
                          duration: 1.4,
                          repeat: on ? Infinity : 0,
                        }}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-[color:var(--line)] pt-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="label-act">
              {dictionary.businessModel.strengthsLabel}
            </p>
            <p className="mt-6 font-display text-xl italic leading-snug text-[color:var(--ink)] md:text-2xl">
              {dictionary.businessModel.quote}
            </p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {dictionary.businessModel.strengths.map((item, i) => (
              <Reveal key={item.title} delay={0.04 * i}>
                <div>
                  <p className="font-mono text-[0.65rem] text-[color:var(--gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-lg text-[color:var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
