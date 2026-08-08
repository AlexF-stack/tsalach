"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";
import { visuals } from "@/content/visuals";
import Image from "next/image";

export function TsaAmbition() {
  const dictionary = useDictionary();

  return (
    <section
      id="story"
      data-nav-surface="light"
      data-tone="light"
      className="relative overflow-hidden section-pad bg-[color:var(--bg-soft)]"
      aria-labelledby="story-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-30 lg:block"
      >
        <Image
          src={visuals.ambition}
          alt=""
          fill
          sizes="50vw"
          quality={65}
          className="img-theme object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[color:var(--bg-soft)]" />
      </div>

      <div className="container-tsa relative z-10">
        <Reveal>
          <p className="label-act">{dictionary.story.label}</p>
          <h2
            id="story-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.story.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-[color:var(--muted)]">
            {dictionary.story.body}
          </p>
        </Reveal>

        <ol className="mt-14 grid list-none gap-4 p-0 md:grid-cols-3 md:gap-5">
          {dictionary.story.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.06}>
                <article className="card-soft h-full bg-white p-6 sm:p-7">
                  <span className="font-display text-3xl font-bold text-[color:var(--accent)]">
                    {item.year}
                  </span>
                  <h3 className="font-display mt-4 text-xl font-semibold text-[color:var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
