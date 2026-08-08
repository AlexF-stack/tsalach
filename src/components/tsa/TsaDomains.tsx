"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { domainVisuals } from "@/content/visuals";
import Image from "next/image";

export function TsaDomains() {
  const dictionary = useDictionary();

  return (
    <section
      id="expertise"
      data-nav-surface="light"
      data-tone="light"
      className="section-pad bg-white"
      aria-labelledby="expertise-heading"
    >
      <div className="container-tsa">
        <Reveal>
          <p className="label-act">{dictionary.expertiseDomains.label}</p>
          <h2
            id="expertise-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.expertiseDomains.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-[color:var(--muted)]">
            {dictionary.expertiseDomains.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {dictionary.expertiseDomains.items.map((domain, i) => {
            const src = domainVisuals[domain.id];
            return (
              <Reveal key={domain.id} delay={i * 0.05} className="h-full">
                <article className="card-soft flex h-full flex-col overflow-hidden bg-white">
                  <div className="relative aspect-[5/3] overflow-hidden bg-[color:var(--bg-soft)] img-theme-frame">
                    {src ? (
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={70}
                        className="img-theme object-cover"
                        priority={i === 0}
                      />
                    ) : null}
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[color:var(--ink)]/75 via-[color:var(--ink)]/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 z-[2]">
                      <p className="font-display text-xs font-bold text-[color:var(--accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display mt-1 text-2xl font-semibold text-white">
                        {domain.title}
                      </h3>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-2.5 bg-[color:var(--bg-soft)]/50 p-5 sm:p-6">
                    {domain.focus.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-[color:var(--muted)]"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
