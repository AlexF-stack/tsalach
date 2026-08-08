"use client";

import { locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/components/providers/LocaleProvider";
import { usePathname } from "next/navigation";

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "";
}

export function LanguageSwitcher({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const { locale } = useLocale();
  const pathname = usePathname() || "/";
  const rest = stripLocale(pathname);

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full px-1 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] shadow-[0_8px_24px_rgba(15,23,42,0.06)] ${
        light
          ? "bg-white/10 text-white/55"
          : "bg-[color:var(--bg-soft)] text-[color:var(--muted)]"
      } ${className}`}
      role="navigation"
      aria-label="Language"
    >
      {locales.map((l: Locale) => {
        const active = l === locale;
        const href = `/${l}${rest}`;
        return (
          <a
            key={l}
            href={href}
            hrefLang={l}
            className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-full px-2.5 transition-colors ${
              active
                ? light
                  ? "bg-white/20 text-[color:var(--accent)]"
                  : "bg-white text-[color:var(--accent)] shadow-sm"
                : light
                  ? "hover:text-white"
                  : "hover:text-[color:var(--ink)]"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {l}
          </a>
        );
      })}
    </div>
  );
}
