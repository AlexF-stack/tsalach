"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { HardLink } from "@/components/site/HardLink";
import { Reveal } from "@/components/tsa/Reveal";
import { objetVisuals } from "@/content/visuals";
import {
  Building2,
  Handshake,
  HardHat,
  Landmark,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const ICONS: Record<string, LucideIcon> = {
  immobilier: Building2,
  epc: HardHat,
  ppp: Handshake,
  engineering: LineChart,
  "public-works": Landmark,
};

export function TsaObjet() {
  const dictionary = useDictionary();
  const { locale } = useLocale();

  return (
    <section
      id="objet"
      data-nav-surface="light"
      data-tone="light"
      className="section-pad bg-[color:var(--bg-soft)]"
      aria-labelledby="objet-heading"
    >
      <div className="container-tsa">
        <Reveal effect="rise">
          <p className="label-act">{dictionary.divisions.actLabel}</p>
          <h2
            id="objet-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.divisions.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-[color:var(--muted)]">
            {dictionary.divisions.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {dictionary.divisions.items.map((item, i) => {
            const Icon = ICONS[item.id] ?? Building2;
            const src = objetVisuals[item.id] ?? item.imageSrc;
            return (
              <Reveal
                key={item.id}
                effect="scale"
                delay={i * 0.06}
                className="h-full"
              >
                <article className="card-soft group flex h-full flex-col overflow-hidden bg-white transition hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(15,23,42,0.12)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--bg-soft)] img-theme-frame">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      quality={60}
                      className="img-theme object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[color:var(--ink)]/50 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 z-[2] inline-flex h-9 w-9 items-center justify-center rounded-[0.55rem] bg-[color:var(--accent)] text-[color:var(--accent-ink)] shadow-[0_8px_20px_var(--accent-glow)]">
                      <Icon className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                    </span>
                    <span className="absolute bottom-3 right-3 z-[2] font-display text-sm font-bold text-white/85">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-[color:var(--ink)] sm:text-xl">
                      {item.title}
                    </h3>
                    <ul className="mt-4 flex-1 space-y-2">
                      {item.focus.slice(0, 4).map((f) => (
                        <li
                          key={f}
                          className="flex gap-2 text-sm leading-relaxed text-[color:var(--muted)]"
                        >
                          <span aria-hidden className="text-[color:var(--accent)]">
                            —
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <HardLink
                      href={`/${locale}/divisions/${item.id}`}
                      className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[color:var(--accent)] transition hover:text-[color:var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                    >
                      {dictionary.ui.viewDivision} →
                    </HardLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
