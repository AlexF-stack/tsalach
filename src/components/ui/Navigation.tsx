"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";
import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { brandAssets } from "@/content/brand";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navigation() {
  const { showNav } = useExperience();
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!showNav) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-[8px]">
      <div className="container-herna flex items-center justify-between py-4 md:py-5">
        <a
          href="#hero"
          className="relative z-50 flex items-center transition-opacity duration-[600ms] ease-out hover:opacity-90"
          onClick={() => setOpen(false)}
          aria-label={brandAssets.name}
        >
          <Image
            src={brandAssets.logoClearSrc}
            alt={brandAssets.holdingName}
            width={140}
            height={110}
            className="h-8 w-auto object-contain md:h-9"
            priority
          />
        </a>

        <div className="relative z-50 flex items-center gap-3 md:gap-5">
          <LanguageSwitcher className="hidden sm:flex" />
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center text-off-white"
            aria-label={
              theme === "dark"
                ? dictionary.ui.themeLight
                : dictionary.ui.themeDark
            }
            data-cursor-hover
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden />
            ) : (
              <Moon className="h-4 w-4" aria-hidden />
            )}
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center"
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? dictionary.ui.closeMenu : dictionary.ui.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? dictionary.ui.close : dictionary.ui.menu}
            </span>
            <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
              <span
                className="block h-px w-full bg-off-white transition-transform duration-[600ms] ease-out"
                style={{
                  transform: open
                    ? "translateY(3.5px) rotate(45deg)"
                    : undefined,
                }}
              />
              <span
                className="block h-px w-full bg-off-white transition-transform duration-[600ms] ease-out"
                style={{
                  transform: open
                    ? "translateY(-3.5px) rotate(-45deg)"
                    : undefined,
                }}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="main-menu"
        className="fixed inset-0 z-40 bg-bg-black/97 transition-opacity duration-[600ms] ease-out"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <ul className="container-herna flex h-full flex-col justify-center gap-6 pt-16">
          {dictionary.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-[clamp(1.75rem,5vw,3rem)] tracking-[-0.02em] text-off-white transition-colors duration-[600ms] ease-out hover:text-gold-light"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-8 flex flex-wrap items-center gap-6 text-sm text-text-gray">
            <Link
              href={`/${locale}/legal-notice`}
              className="link-underline"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {dictionary.ui.legalNotice}
            </Link>
            <Link
              href={`/${locale}/privacy-policy`}
              className="link-underline"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {dictionary.ui.privacyPolicy}
            </Link>
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
}
