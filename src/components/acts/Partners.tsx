"use client";

import { ChapterNumber } from "@/components/ui/ChapterNumber";
import { useDictionary } from "@/components/providers/LocaleProvider";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Partners() {
  const dictionary = useDictionary();
  const reduced = usePrefersReducedMotion();
  const loop = [...dictionary.partners.items, ...dictionary.partners.items];

  return (
    <section
      id="partners"
      className="relative z-20 py-24 md:py-32"
      aria-labelledby="partners-heading"
    >
      <div className="container-herna mb-14">
        <ChapterNumber number="06" label={dictionary.partners.label} />
        <h2
          id="partners-heading"
          className="heading-display max-w-[14ch] text-display-md"
        >
          {dictionary.partners.headline}
        </h2>
      </div>

      <div
        className="partner-marquee py-6"
        data-lenis-prevent
        role="region"
        aria-label={dictionary.partners.label}
      >
        <div
          className="partner-marquee__track"
          style={reduced ? { animation: "none" } : undefined}
        >
          {loop.map((partner, i) => (
            <a
              key={`${partner.id}-${i}`}
              href="#partners"
              className="partner-logo relative flex h-28 w-56 shrink-0 items-center justify-center px-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-primary"
              style={{ backgroundColor: "transparent" }}
              data-cursor-hover
              tabIndex={i < dictionary.partners.items.length ? 0 : -1}
              aria-label={partner.name}
            >
              <Image
                src={partner.logoSrc}
                alt=""
                width={200}
                height={72}
                className="h-auto max-h-14 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>

      <ul className="container-herna mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {dictionary.partners.items.map((partner) => (
          <li key={partner.id}>
            <h3 className="font-display text-lg text-off-white">
              {partner.name}
            </h3>
            <p className="mt-2 text-body text-text-gray">{partner.role}</p>
            {partner.phone && partner.phoneTel ? (
              <a
                href={`tel:${partner.phoneTel}`}
                className="link-underline mt-3 inline-block text-sm text-gold-light"
              >
                {partner.phone}
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
