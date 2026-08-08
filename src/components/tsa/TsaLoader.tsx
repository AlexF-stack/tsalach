"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { brandAssets } from "@/content/brand";
import { useEffect, useState } from "react";

const SESSION_KEY = "tsalach-intro-seen";
const MAX_MS = 650;

type Props = {
  onComplete?: () => void;
};

/**
 * Brief brand flash — always tears down (no stuck overlay).
 */
export function TsaLoader({ onComplete }: Props) {
  const dictionary = useDictionary();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete?.();
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const finish = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      document.body.style.overflow = "";
      setVisible(false);
      onComplete?.();
    };

    const timer = window.setTimeout(finish, MAX_MS);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!mounted || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
      aria-hidden
    >
      <p className="font-display text-[clamp(2rem,8vw,3.5rem)] font-bold tracking-[0.18em] text-[color:var(--accent)]">
        {brandAssets.name}
      </p>
      <span className="sr-only">{dictionary.ui.loading}</span>
    </div>
  );
}
