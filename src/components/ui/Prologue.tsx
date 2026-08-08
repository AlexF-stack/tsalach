"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";
import { useDictionary } from "@/components/providers/LocaleProvider";
import { brandAssets } from "@/content/brand";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type Props = {
  onComplete: () => void;
  active: boolean;
};

const TITLE_WORDS = ["HERITAGE", "OF", "NATIONS"] as const;

export function Prologue({ onComplete, active }: Props) {
  const dictionary = useDictionary();
  const reduced = usePrefersReducedMotion();
  const { setPhase, setIntroComplete, setShowNav } = useExperience();
  const rootRef = useRef<HTMLDivElement>(null);
  const completed = useRef(false);

  const finish = () => {
    if (completed.current) return;
    completed.current = true;
    setPhase("hero");
    setIntroComplete(true);
    setShowNav(true);
    onComplete();
  };

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      finish();
      return;
    }

    setPhase("intro");
    const root = rootRef.current;
    if (!root) return;

    const wordEls = root.querySelectorAll<HTMLElement>(".prologue-word");
    const taglineEls = root.querySelectorAll<HTMLElement>(".prologue-tag");
    const logoEl = root.querySelector<HTMLElement>(".prologue-logo");

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: finish,
    });

    tl.fromTo(
      ".prologue-light",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 },
    );

    tl.fromTo(
      logoEl,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.2",
    );
    tl.to(logoEl, { opacity: 0, duration: 0.45, delay: 0.55 });

    wordEls.forEach((wordEl) => {
      const chars = wordEl.querySelectorAll(".prologue-char");
      tl.set(wordEl, { opacity: 1 });
      tl.fromTo(
        chars,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.35 },
      );
      tl.to(wordEl, { opacity: 0.15, duration: 0.35, delay: 0.25 });
    });

    tl.to(wordEls, { opacity: 1, duration: 0.4 });
    tl.fromTo(
      taglineEls,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.55 },
    );

    tl.call(() => setPhase("hero"));
    tl.to(root, { opacity: 0, duration: 0.85, delay: 0.9, pointerEvents: "none" });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      id="intro"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-black px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prologue-sr-title"
    >
      <div className="sr-only" id="prologue-sr-title">
        <h1>{brandAssets.fullName}</h1>
        <p>{dictionary.brand.tagline}</p>
        <p>{dictionary.prologue.lines[0]}</p>
        <p>{dictionary.prologue.lines[1]}</p>
        <p>{dictionary.prologue.lines[2]}</p>
      </div>

      <div
        className="prologue-light absolute h-1.5 w-1.5 rounded-full bg-gold-primary"
        style={{
          boxShadow:
            "0 0 28px 10px rgba(212,175,55,0.5), 0 0 70px 20px rgba(212,175,55,0.18)",
        }}
        aria-hidden="true"
      />

      <div
        className="prologue-logo absolute opacity-0"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brandAssets.logoOnDarkSrc}
          alt=""
          className="h-auto w-[min(70vw,340px)] object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        {TITLE_WORDS.map((word) => (
          <p
            key={word}
            className="prologue-word font-display text-[clamp(2.5rem,9vw,6rem)] leading-[0.95] tracking-[-0.03em] text-off-white opacity-0"
            aria-hidden="true"
          >
            {word.split("").map((ch, i) => (
              <span key={`${word}-${i}`} className="prologue-char inline-block">
                {ch}
              </span>
            ))}
          </p>
        ))}
        <p className="prologue-tag mt-8 text-body-lg text-text-gray opacity-0">
          Building the Future.
        </p>
        <p className="prologue-tag text-body-lg text-text-gray opacity-0">
          Honoring the Legacy.
        </p>
      </div>

      {!reduced && (
        <button
          type="button"
          className="link-underline absolute bottom-8 right-8 z-20 text-sm text-text-gray"
          onClick={finish}
        >
          {dictionary.prologue.skip}
        </button>
      )}
    </div>
  );
}
