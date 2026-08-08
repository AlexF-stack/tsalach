"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { BrandLogo } from "@/components/site/BrandLogo";
import { HardLink } from "@/components/site/HardLink";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { brandAssets } from "@/content/brand";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type NavSurface = "hero" | "dark" | "gold" | "light";

type Props = {
  visible: boolean;
  initialSurface?: NavSurface;
};

function readNavSurface(header: HTMLElement | null): NavSurface {
  const x = Math.round(window.innerWidth / 2);
  const y = Math.min(56, Math.max(8, window.innerHeight - 1));
  const prev = header?.style.pointerEvents;
  if (header) header.style.pointerEvents = "none";
  const el = document.elementFromPoint(x, y);
  if (header) header.style.pointerEvents = prev ?? "";

  const tagged = el?.closest("[data-nav-surface]");
  const value = tagged?.getAttribute("data-nav-surface");
  if (
    value === "hero" ||
    value === "dark" ||
    value === "gold" ||
    value === "light"
  ) {
    return value;
  }
  if (el?.closest(".section-gold, .section-blue")) return "gold";
  if (el?.closest("#hero")) return "hero";
  if (el?.closest("footer")) return "dark";
  return "light";
}

export function SiteNav({ visible, initialSurface = "hero" }: Props) {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [surface, setSurface] = useState<NavSurface>(initialSurface);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setSurface(readNavSurface(headerRef.current));
    };
    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!visible) return null;

  const activeSurface: NavSurface = open ? "dark" : surface;
  const goldBar = activeSurface === "light";
  const darkBar =
    activeSurface === "gold" ||
    activeSurface === "dark" ||
    activeSurface === "hero";

  const headerClass = goldBar
    ? "border-b border-[color:var(--gold)]/20 bg-[image:var(--nav-on-light)] shadow-[0_6px_24px_rgba(26,36,51,0.06)] backdrop-blur-md"
    : activeSurface === "hero"
      ? "border-b border-transparent bg-gradient-to-b from-black/40 to-transparent"
      : "border-b border-white/10 bg-[color:var(--nav-on-gold)] shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl";

  const linkTone = goldBar
    ? "text-[color:var(--navy-deep)]/75 hover:text-[color:var(--navy-deep)]"
    : "text-white/75 hover:text-white";
  const iconTone = goldBar ? "text-[color:var(--navy-deep)]" : "text-white";
  const buildHref = (href: string) => `/${locale}${href}`;
  const resolveNavHref = (href: string, external?: boolean) => {
    if (external || href.startsWith("http")) return href;
    return buildHref(href);
  };
  const address = brandAssets.address[locale];

  const mobileMenu = mounted
    ? createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              id={menuId}
              key="mobile-menu"
              className="fixed inset-0 z-[90] xl:hidden"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={dictionary.ui.menu}
            >
              <div className="absolute inset-0 bg-[color:var(--navy-deep)]" />
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(ellipse at 100% 0%, rgba(201,162,75,0.18), transparent 45%), radial-gradient(ellipse at 0% 90%, rgba(26,36,51,0.5), transparent 40%)",
                }}
                aria-hidden
              />

              <motion.div
                className="relative flex h-[100dvh] flex-col"
                initial={reduced ? false : { y: 18, opacity: 0.85 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? undefined : { y: 10, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="container-herna flex items-center justify-between gap-3 pb-3 pt-[max(0.85rem,env(safe-area-inset-top))]">
                  <a
                    href={buildHref("#hero")}
                    className="flex min-w-0 items-center"
                    onClick={() => setOpen(false)}
                    aria-label={brandAssets.name}
                  >
                    <BrandLogo
                      variant="nav"
                      width={240}
                      height={84}
                      className="h-12 w-auto object-contain sm:h-14"
                      alt=""
                    />
                  </a>
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher className="rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/15 [&_a]:text-white/70 [&_a[aria-current=page]]:text-[color:var(--gold)] [&_a:hover]:text-white" />
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[color:var(--navy-deep)] shadow-sm"
                      aria-label={dictionary.ui.closeMenu}
                      onClick={() => setOpen(false)}
                      data-cursor-hover
                    >
                      <X className="h-5 w-5" aria-hidden />
                    </button>
                  </div>
                </div>

                <nav
                  className="container-herna flex-1 overflow-y-auto overscroll-contain pb-4 pt-2"
                  aria-label={dictionary.ui.menu}
                >
                  <p className="label-act mb-3 text-[color:var(--gold)]">
                    {dictionary.ui.menu}
                  </p>
                  <ul className="flex flex-col">
                    {dictionary.nav.map((link, i) => (
                      <motion.li
                        key={link.href}
                        initial={reduced ? false : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.04 + i * 0.04,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <a
                          href={resolveNavHref(link.href, link.external)}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="group flex min-h-[3.4rem] items-center border-b border-white/12 py-3.5"
                          onClick={() => setOpen(false)}
                          data-cursor-hover
                        >
                          <span className="font-display text-[clamp(1.45rem,6.2vw,2.1rem)] leading-none text-white transition-colors group-active:text-[color:var(--gold)]">
                            {link.label}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="container-herna space-y-4 border-t border-white/12 bg-black/25 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-md">
                  <a
                    href={buildHref("#contact")}
                    className="btn-primary w-full"
                    onClick={() => setOpen(false)}
                    data-cursor-hover
                  >
                    {dictionary.ui.contactShort}
                  </a>
                  <div className="flex flex-wrap items-start justify-between gap-3 text-sm text-white/65">
                    <div className="space-y-1">
                      <p className="font-medium text-white">
                        {brandAssets.holdingName}
                      </p>
                      <p>{address}</p>
                      <a
                        href={`tel:${brandAssets.phoneTel}`}
                        className="block text-[color:var(--gold)] hover:underline"
                      >
                        {brandAssets.phone}
                      </a>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <HardLink
                        href={`/${locale}/legal-notice`}
                        className="hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        {dictionary.ui.legalNotice}
                      </HardLink>
                      <HardLink
                        href={`/${locale}/privacy-policy`}
                        className="hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        {dictionary.ui.privacyPolicy}
                      </HardLink>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter,box-shadow] duration-500 ${headerClass}`}
      >
        <div className="container-herna flex items-center justify-between gap-3 py-3 sm:py-3.5 md:py-4">
          <a
            href={buildHref("#hero")}
            className="relative z-50 flex shrink-0 items-center transition-transform duration-500 ease-out hover:scale-[1.03]"
            onClick={() => setOpen(false)}
            aria-label={brandAssets.name}
            data-cursor-hover
          >
            <BrandLogo
              variant="nav"
              width={240}
              height={84}
              className={`h-12 w-auto object-contain sm:h-[3.35rem] md:h-14 ${
                darkBar && !goldBar
                  ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                  : ""
              }`}
              priority
            />
          </a>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:block"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-0.5">
              {dictionary.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={resolveNavHref(link.href, link.external)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    data-cursor-hover
                    className={`group relative rounded-full px-3 py-2 text-[0.78rem] font-medium tracking-wide transition-colors duration-300 ${linkTone}`}
                  >
                    {link.label}
                    <span
                      className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${
                        goldBar
                          ? "bg-[color:var(--navy-deep)]"
                          : "bg-[color:var(--gold-soft)]"
                      }`}
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-50 flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher
              className={
                goldBar
                  ? "[&_a]:text-[color:var(--navy-deep)]/65 [&_a[aria-current=page]]:text-[color:var(--navy-deep)] [&_a:hover]:text-[color:var(--navy-deep)]"
                  : "[&_a]:text-white/65 [&_a[aria-current=page]]:text-[color:var(--gold-soft)] [&_a:hover]:text-white"
              }
            />
            <a
              href={buildHref("#contact")}
              data-cursor-hover
              className={`btn-primary !min-h-9 !px-3.5 !py-2 text-sm max-[380px]:hidden ${
                goldBar ? "!text-[color:var(--navy-deep)]" : ""
              }`}
            >
              {dictionary.ui.contactShort}
            </a>
            <button
              type="button"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition xl:hidden ${
                open
                  ? "bg-white/90 text-[color:var(--ink)] shadow-sm"
                  : `hover:bg-black/10 ${iconTone}`
              }`}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={
                open ? dictionary.ui.closeMenu : dictionary.ui.openMenu
              }
              onClick={() => setOpen((v) => !v)}
              data-cursor-hover
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <span aria-hidden className="flex w-5 flex-col items-end gap-[5px]">
                  <span
                    className={`block h-[1.5px] w-full rounded-full ${
                      goldBar ? "bg-[color:var(--navy-deep)]" : "bg-white"
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-3.5 rounded-full ${
                      goldBar ? "bg-[color:var(--navy-deep)]" : "bg-white"
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full rounded-full ${
                      goldBar ? "bg-[color:var(--navy-deep)]" : "bg-white"
                    }`}
                  />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
