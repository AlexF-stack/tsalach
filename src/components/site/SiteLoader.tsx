"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { brandAssets } from "@/content/brand";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SESSION_KEY = "tsalach-intro-seen";
/** Keep the brand beat short — returning visitors skip entirely. */
const MAX_MS = 900;

type Props = {
  onComplete: () => void;
};

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

/**
 * Brand intro shell — short, fail-safe.
 * Initial `visible` is always `true` so SSR HTML matches the first client paint;
 * session / reduced-motion decisions run only after mount.
 */
export function SiteLoader({ onComplete }: Props) {
  const dictionary = useDictionary();
  const reduced = useReducedMotion();
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  /** Must be identical on server + first client render (no sessionStorage / media queries). */
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const complete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    markSeen();
    document.body.style.overflow = "";
    setVisible(false);
    onCompleteRef.current();
  };

  useLayoutEffect(() => {
    // Skip intro after first visit or when motion is reduced — before paint when possible.
    if (hasSeenIntro() || reduced) {
      completedRef.current = true;
      document.body.style.overflow = "";
      setVisible(false);
      onCompleteRef.current();
      return;
    }

    document.body.style.overflow = "hidden";

    const started = Date.now();
    const tick = window.setInterval(() => {
      const p = Math.min(
        100,
        Math.round(((Date.now() - started) / MAX_MS) * 100),
      );
      setProgress(p);
    }, 50);

    const timer = window.setTimeout(complete, MAX_MS);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(tick);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="tsalach-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0e1a]"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          aria-busy="true"
          aria-label={dictionary.ui.loading}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandAssets.logoOnDarkSrc}
            alt=""
            width={520}
            height={420}
            className="relative z-[1] w-[min(72vw,20rem)] object-contain"
          />

          <div className="absolute inset-x-0 bottom-16 z-[2] flex flex-col items-center">
            <div className="h-px w-40 overflow-hidden bg-white/15 sm:w-52">
              <div
                className="h-full bg-[color:var(--gold)] transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            className="absolute bottom-8 z-[3] text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
            onClick={complete}
            data-cursor-hover
          >
            {dictionary.prologue.skip}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
