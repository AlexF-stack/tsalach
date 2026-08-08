"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { useEffect, useState } from "react";

/** CTA flottant — contact TSALACH */
export function TsaFloatContact() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={`/${locale}#contact`}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] z-[110] inline-flex min-h-12 max-w-[calc(100vw-1.5rem)] items-center justify-center rounded-[0.65rem] bg-[color:var(--accent)] px-4 text-[0.8rem] font-bold tracking-[-0.01em] text-[color:var(--accent-ink)] shadow-[0_12px_40px_var(--accent-glow)] transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-hover)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)] min-[380px]:px-6 min-[380px]:text-[0.84rem] md:bottom-8 md:right-8"
    >
      {dictionary.ui.contactShort}
    </a>
  );
}
