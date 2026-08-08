"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/site/Reveal";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AUTO_MS = 4200;

const ACCENTS = [
  "from-[color:var(--navy-deep)] to-[#0f1824]",
  "from-[color:var(--bg-elevated)] to-[color:var(--bg-elevated)]",
  "from-[color:var(--gold-wash)] via-[color:var(--gold-soft)] to-[#dcc89a]",
  "from-[color:var(--navy)] to-[color:var(--navy-deep)]",
  "from-[color:var(--bg-elevated)] to-[color:var(--line)]/30",
  "from-[color:var(--gold-soft)] to-[color:var(--gold-wash)]",
  "from-[color:var(--navy-deep)] to-[#152033]",
  "from-[color:var(--bg-elevated)] to-[color:var(--gold-wash)]/40",
] as const;

const TEXT = [
  { title: "text-white", body: "text-white/70", badge: "bg-[color:var(--gold)] text-[color:var(--navy-deep)]" },
  { title: "text-[color:var(--ink)]", body: "text-[color:var(--muted)]", badge: "bg-[color:var(--navy-deep)] text-[color:var(--gold)]" },
  { title: "text-[color:var(--navy-deep)]", body: "text-[color:var(--navy-deep)]/75", badge: "bg-[color:var(--navy-deep)] text-[color:var(--gold)]" },
  { title: "text-white", body: "text-white/70", badge: "bg-[color:var(--gold)] text-[color:var(--navy-deep)]" },
  { title: "text-[color:var(--ink)]", body: "text-[color:var(--muted)]", badge: "bg-[color:var(--gold)] text-[color:var(--navy-deep)]" },
  { title: "text-[color:var(--navy-deep)]", body: "text-[color:var(--navy-deep)]/80", badge: "bg-[color:var(--navy-deep)] text-[color:var(--gold)]" },
  { title: "text-white", body: "text-white/70", badge: "bg-[color:var(--gold)] text-[color:var(--navy-deep)]" },
  { title: "text-[color:var(--ink)]", body: "text-[color:var(--muted)]", badge: "bg-[color:var(--navy-deep)] text-[color:var(--gold)]" },
] as const;

/** Interactive spotlight — vertical selector + animated detail panel. */
export function SiteWhyInvest() {
  const dictionary = useDictionary();
  const reduced = useReducedMotion();
  const items = dictionary.whyInvest.items;
  const total = items.length;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25, once: false });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hold = useRef(0);

  useEffect(() => {
    if (reduced || !inView || paused) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      hold.current += dt;
      if (hold.current >= AUTO_MS) {
        hold.current = 0;
        setActive((i) => (i + 1) % total);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, inView, paused, total]);

  const select = (i: number) => {
    setActive(i);
    hold.current = 0;
  };

  const item = items[active];
  const accent = ACCENTS[active % ACCENTS.length];
  const text = TEXT[active % TEXT.length];
  const isLight = active === 1 || active === 4 || active === 7;
  const isGold = active === 2 || active === 5;

  return (
    <section
      ref={sectionRef}
      id="why-invest"
      data-nav-surface="gold"
      className="section-gold section-pad relative overflow-hidden border-y"
      aria-labelledby="why-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(26,36,51,0.08), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="container-herna relative">
        <Reveal className="max-w-2xl">
          <p className="label-act">{dictionary.whyInvest.label}</p>
          <h2 id="why-heading" className="heading-display mt-4 text-display-md">
            {dictionary.whyInvest.headline}
          </h2>
          <p className="mt-5 text-body-lg text-[color:var(--muted)]">
            {dictionary.whyInvest.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10 xl:gap-14">
          {/* Selector */}
          <Reveal delay={0.05}>
            <nav aria-label={dictionary.whyInvest.label}>
              <ol className="flex flex-col gap-2 sm:gap-2.5">
                {items.map((entry, i) => {
                  const isActive = i === active;
                  return (
                    <li key={entry.title}>
                      <button
                        type="button"
                        onClick={() => select(i)}
                        aria-current={isActive ? "step" : undefined}
                        className={`group flex w-full items-start gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 sm:px-5 sm:py-4 ${
                          isActive
                            ? "border-[color:var(--navy-deep)]/20 bg-[color:var(--bg-elevated)] shadow-[0_12px_40px_rgba(26,36,51,0.12)]"
                            : "border-transparent bg-[color:var(--bg-elevated)]/50 hover:border-[color:var(--gold)]/30 hover:bg-[color:var(--bg-elevated)]/80"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[0.65rem] transition-colors duration-300 ${
                            isActive
                              ? "bg-[color:var(--navy-deep)] text-[color:var(--gold)]"
                              : "bg-[color:var(--line)] text-[color:var(--muted)] group-hover:bg-[color:var(--gold)]/20 group-hover:text-[color:var(--navy-deep)]"
                          }`}
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block font-display text-base leading-snug transition-colors sm:text-lg ${
                              isActive
                                ? "text-[color:var(--navy-deep)]"
                                : "text-[color:var(--ink)]/80 group-hover:text-[color:var(--ink)]"
                            }`}
                          >
                            {entry.title}
                          </span>
                          {isActive ? (
                            <motion.span
                              layout
                              className="mt-1.5 block text-xs leading-relaxed text-[color:var(--muted)] sm:text-sm"
                              initial={reduced ? false : { opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35 }}
                            >
                              {entry.body}
                            </motion.span>
                          ) : null}
                        </span>
                        <span
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
                            isActive
                              ? "scale-100 bg-[color:var(--gold)]"
                              : "scale-0 bg-transparent"
                          }`}
                          aria-hidden
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>

          {/* Spotlight panel */}
          <Reveal delay={0.1} className="relative min-h-[20rem] lg:min-h-[28rem]">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <motion.article
                  key={active}
                  className={`relative flex min-h-[20rem] flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br p-8 shadow-[0_24px_64px_rgba(26,36,51,0.18)] sm:min-h-[24rem] sm:p-10 lg:min-h-[28rem] lg:p-12 ${accent}`}
                  initial={reduced ? false : { opacity: 0, x: 40, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, x: -30, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Decorative geometry */}
                  <motion.div
                    className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border ${
                      isLight ? "border-[color:var(--gold)]/25" : "border-white/10"
                    }`}
                    animate={reduced ? undefined : { rotate: 360 }}
                    transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                    aria-hidden
                  />
                  <motion.div
                    className={`pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full ${
                      isGold ? "bg-white/10" : "bg-[color:var(--gold)]/10"
                    }`}
                    animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-sm ${text.badge}`}
                      aria-hidden
                    >
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-mono text-[0.6rem] uppercase tracking-[0.22em] ${
                        isLight || isGold ? "text-[color:var(--navy-deep)]/50" : "text-white/40"
                      }`}
                    >
                      TSALACH
                    </span>
                  </div>

                  <h3
                    className={`relative mt-8 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] ${text.title}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`relative mt-5 max-w-lg text-base leading-relaxed sm:text-lg ${text.body}`}
                  >
                    {item.body}
                  </p>

                  <div className="relative mt-auto flex items-end justify-between gap-4 pt-10">
                    <div className="flex gap-1.5" role="tablist" aria-label={dictionary.whyInvest.label}>
                      {items.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          role="tab"
                          aria-selected={i === active}
                          aria-label={`${String(i + 1).padStart(2, "0")}`}
                          onClick={() => select(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === active
                              ? `w-8 ${isLight || isGold ? "bg-[color:var(--navy-deep)]" : "bg-[color:var(--gold)]"}`
                              : `w-1.5 ${isLight || isGold ? "bg-[color:var(--navy-deep)]/25" : "bg-white/25"}`
                          }`}
                        />
                      ))}
                    </div>
                    <motion.div
                      className={`h-px flex-1 max-w-[6rem] origin-right ${
                        isLight || isGold ? "bg-[color:var(--navy-deep)]/30" : "bg-[color:var(--gold)]/50"
                      }`}
                      initial={reduced ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      aria-hidden
                    />
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 text-center" delay={0.1}>
          <motion.p
            className="font-display text-xl italic text-[color:var(--navy-deep)] md:text-2xl"
            whileInView={reduced ? undefined : { scale: [0.96, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            &ldquo;{dictionary.whyInvest.quote}&rdquo;
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
