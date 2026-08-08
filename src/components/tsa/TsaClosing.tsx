"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { MagneticButton } from "@/components/tsa/MagneticButton";
import { Reveal } from "@/components/tsa/Reveal";
import { brandAssets } from "@/content/brand";
import { visuals } from "@/content/visuals";
import Image from "next/image";

export function TsaClosing() {
  const dictionary = useDictionary();
  const { locale } = useLocale();

  return (
    <section
      id="closing"
      data-nav-surface="light"
      data-tone="light"
      className="relative overflow-hidden bg-white"
      aria-labelledby="closing-heading"
    >
      <div className="container-tsa relative z-10 section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label-act">{dictionary.closing.label}</p>
              <h2
                id="closing-heading"
                className="heading-display mt-4 max-w-3xl text-display-md"
              >
                {dictionary.closing.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.06} className="mt-8 max-w-2xl space-y-5">
              {dictionary.closing.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="text-base leading-relaxed text-[color:var(--muted)] md:text-lg"
                >
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <blockquote className="card-soft max-w-2xl bg-[color:var(--accent-soft)] px-6 py-6 sm:px-8">
                <p className="font-display text-lg font-semibold italic leading-snug text-[color:var(--ink)] md:text-xl">
                  «{dictionary.closing.quote}»
                </p>
              </blockquote>
            </Reveal>

            <Reveal
              delay={0.14}
              className="mt-10 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap"
            >
              <MagneticButton
                href={`/${locale}#contact`}
                className="btn-primary min-h-12"
              >
                {dictionary.closing.cta}
              </MagneticButton>
              <MagneticButton
                href={brandAssets.companyProfileSrc}
                download={brandAssets.companyProfileDownloadName}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary min-h-12"
              >
                {dictionary.ui.downloadProfile}
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="card-soft relative aspect-[4/5] overflow-hidden img-theme-frame sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={visuals.closing}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={70}
                className="img-theme object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
