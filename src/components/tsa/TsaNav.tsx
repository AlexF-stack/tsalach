"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { BrandLogo } from "@/components/site/BrandLogo";
import { HardLink } from "@/components/site/HardLink";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { brandAssets } from "@/content/brand";
import { useEffect, useState } from "react";

type NavSurface = "hero" | "light" | "ink" | "accent";

/** Prefer light TopTrainer surfaces; soft ink on dark bands. */
function toneToSurface(tone: string | null, isHero: boolean): NavSurface {
  if (isHero) return "hero";
  if (tone === "dark" || tone === "black") return "ink";
  if (tone === "gold") return "accent";
  return "light";
}

const SURFACE_STYLE: Record<
  NavSurface,
  { header: string; link: string; burger: string; mobile: string; cta: string }
> = {
  hero: {
    header: "border-b border-transparent bg-[color:var(--ink)]/25 backdrop-blur-md",
    link: "text-white/85 hover:bg-white/10 hover:text-white",
    burger: "border-white/30 text-white",
    mobile: "border-t border-white/10 bg-[color:var(--ink)] text-white",
    cta: "!bg-[color:var(--accent)] !text-[color:var(--accent-ink)] hover:!bg-[color:var(--accent-hover)] hover:!text-white",
  },
  light: {
    header:
      "border-b border-[color:var(--line)] bg-white/96 shadow-[0_12px_40px_rgba(11,11,11,0.08)] backdrop-blur-md",
    link: "text-[color:var(--ink)]/75 hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--ink)]",
    burger: "border-[color:var(--line)] text-[color:var(--ink)]",
    mobile: "border-t border-[color:var(--line)] bg-white text-[color:var(--ink)]",
    cta: "!bg-[color:var(--accent)] !text-[color:var(--accent-ink)] hover:!bg-[color:var(--accent-hover)] hover:!text-white",
  },
  ink: {
    header:
      "border-b border-white/10 bg-[color:var(--ink)] shadow-[0_12px_40px_rgba(11,11,11,0.35)]",
    link: "text-white/85 hover:bg-white/10 hover:text-white",
    burger: "border-white/30 text-white",
    mobile: "border-t border-white/10 bg-[color:var(--ink)] text-white",
    cta: "!bg-[color:var(--accent)] !text-[color:var(--accent-ink)] hover:!bg-[color:var(--accent-hover)] hover:!text-white",
  },
  accent: {
    header:
      "border-b border-[color:var(--accent)]/15 bg-[color:var(--accent-soft)] shadow-[0_12px_40px_rgba(198,146,20,0.14)]",
    link: "text-[color:var(--ink)]/80 hover:bg-white/70 hover:text-[color:var(--ink)]",
    burger: "border-[color:var(--accent)]/25 text-[color:var(--ink)]",
    mobile:
      "border-t border-[color:var(--accent)]/15 bg-[color:var(--accent-soft)] text-[color:var(--ink)]",
    cta: "!bg-[color:var(--accent)] !text-[color:var(--accent-ink)] hover:!bg-[color:var(--accent-hover)] hover:!text-white",
  },
};

const PROBE_Y = 88;

export function TsaNav() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const [surface, setSurface] = useState<NavSurface>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const pick = () => {
      setScrolled(window.scrollY > 12);

      const nodes = document.querySelectorAll<HTMLElement>(
        "section[data-nav-surface], section[data-tone], footer[data-nav-surface]",
      );

      let match: HTMLElement | null = null;
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          match = node;
          break;
        }
      }

      if (!match) {
        setSurface(window.scrollY < 48 ? "hero" : "light");
        return;
      }

      if (match.getAttribute("data-nav-surface") === "hero") {
        setSurface(window.scrollY > 24 ? "light" : "hero");
        return;
      }

      const tone =
        match.getAttribute("data-tone") ||
        match.getAttribute("data-nav-surface");
      setSurface(toneToSurface(tone, false));
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick, { passive: true });
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeSurface = open && surface === "hero" ? "ink" : surface;
  const style = SURFACE_STYLE[activeSurface];
  const lightText = activeSurface === "ink" || activeSurface === "hero";
  const shadowBoost =
    scrolled && activeSurface === "hero"
      ? " shadow-[0_12px_40px_rgba(11,11,11,0.35)] bg-[color:var(--ink)]/70"
      : "";

  const buildHref = (href: string) => `/${locale}${href}`;
  const resolveNavHref = (href: string, external?: boolean) => {
    if (external || href.startsWith("http")) return href;
    return buildHref(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${style.header}${shadowBoost}`}
    >
      <div
        aria-hidden
        className="h-[3px] w-full bg-[color:var(--accent)]"
      />

      <div className="mx-auto flex h-[4.25rem] max-w-[1240px] items-center justify-between gap-2 px-4 min-[380px]:gap-4 min-[380px]:px-5 min-[900px]:h-[4.75rem] min-[900px]:px-6">
        <a
          href={buildHref("#hero")}
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label={`${brandAssets.holdingName} — ${dictionary.ui.backHome}`}
        >
          {lightText ? (
            <BrandLogo
              variant="nav"
              width={160}
              height={56}
              className="h-8 w-auto max-w-[7.5rem] object-contain object-left brightness-110 drop-shadow-sm min-[380px]:h-9 min-[380px]:max-w-none sm:h-10"
              priority
              alt={brandAssets.name}
            />
          ) : (
            <BrandLogo
              variant="nav"
              width={160}
              height={56}
              className="h-8 w-auto max-w-[7.5rem] object-contain object-left min-[380px]:h-9 min-[380px]:max-w-none sm:h-10"
              priority
              alt={brandAssets.name}
            />
          )}
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-0.5 min-[900px]:flex"
        >
          {dictionary.nav.map((link) => (
            <a
              key={link.href}
              href={resolveNavHref(link.href, link.external)}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`rounded-lg px-3 py-2.5 text-[0.78rem] font-semibold tracking-[-0.01em] transition-colors ${style.link}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 min-[900px]:flex">
          <LanguageSwitcher light={lightText} />
          <a
            href={buildHref("#contact")}
            className={`inline-flex min-h-11 items-center justify-center rounded-[0.65rem] px-6 py-2.5 text-[0.84rem] font-bold tracking-[-0.01em] shadow-[0_10px_28px_var(--accent-glow)] transition-[background-color,color,transform] duration-250 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] ${style.cta}`}
          >
            {dictionary.ui.contactShort}
          </a>
        </div>

        <div className="flex items-center gap-2 min-[900px]:hidden">
          <LanguageSwitcher light={lightText} />
          <button
            type="button"
            className={`relative z-[130] flex h-11 w-11 items-center justify-center rounded-[0.65rem] border ${style.burger}`}
            aria-expanded={open}
            aria-controls="tsa-mobile-nav"
            aria-label={open ? dictionary.ui.closeMenu : dictionary.ui.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{dictionary.ui.menu}</span>
            <span
              aria-hidden
              className={`absolute h-0.5 w-5 bg-current transition-transform duration-[250ms] ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-5 bg-current transition-transform duration-[250ms] ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </div>
      </div>

      <div
        id="tsa-mobile-nav"
        hidden={!open}
        className={`max-h-[calc(100dvh-4.25rem-env(safe-area-inset-top,0px))] overflow-y-auto overscroll-contain px-5 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] min-[900px]:hidden ${style.mobile}`}
      >
        <nav aria-label={dictionary.ui.menu} className="flex flex-col gap-0.5">
          {dictionary.nav.map((link) => (
            <a
              key={link.href}
              href={resolveNavHref(link.href, link.external)}
              onClick={() => setOpen(false)}
              className={`rounded-[0.65rem] px-3 py-2.5 font-display text-[1.15rem] font-extrabold tracking-tight min-[380px]:text-xl min-[380px]:py-3 ${
                lightText
                  ? "text-white hover:bg-white/10"
                  : "text-[color:var(--ink)] hover:bg-[color:var(--accent-soft)]"
              }`}
            >
              {link.label}
            </a>
          ))}
          <p
            className={`mt-2 px-3 text-[0.68rem] font-semibold leading-snug tracking-[0.04em] ${
              lightText ? "text-white/55" : "text-[color:var(--muted)]"
            }`}
          >
            {dictionary.brand.footprint}
          </p>
          <a
            href={buildHref("#contact")}
            onClick={() => setOpen(false)}
            className={`mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-[0.65rem] px-6 py-3 text-sm font-bold shadow-[0_10px_28px_var(--accent-glow)] ${style.cta}`}
          >
            {dictionary.ui.contactShort}
          </a>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 px-3 text-sm">
            <HardLink
              href={`/${locale}/legal-notice`}
              className={`inline-flex min-h-10 items-center ${
                lightText
                  ? "text-white/55 hover:text-white"
                  : "text-[color:var(--muted)] hover:text-[color:var(--ink)]"
              }`}
              onClick={() => setOpen(false)}
            >
              {dictionary.ui.legalNotice}
            </HardLink>
            <HardLink
              href={`/${locale}/privacy-policy`}
              className={`inline-flex min-h-10 items-center ${
                lightText
                  ? "text-white/55 hover:text-white"
                  : "text-[color:var(--muted)] hover:text-[color:var(--ink)]"
              }`}
              onClick={() => setOpen(false)}
            >
              {dictionary.ui.privacyPolicy}
            </HardLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
