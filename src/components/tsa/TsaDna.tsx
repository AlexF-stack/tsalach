"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";

export function TsaDna() {
  const dictionary = useDictionary();

  return (
    <section
      id="dna"
      data-nav-surface="light"
      data-tone="light"
      className="section-pad bg-[color:var(--bg-soft)]"
      aria-labelledby="dna-heading"
    >
      <div className="container-tsa">
        <Reveal>
          <p className="label-act">{dictionary.approach.label}</p>
          <h2
            id="dna-heading"
            className="heading-display mt-4 max-w-3xl text-display-md"
          >
            {dictionary.approach.label}
          </h2>
          <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
            {dictionary.approach.intro}
          </p>
        </Reveal>

        <ul className="-mx-1 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0 md:snap-none [&::-webkit-scrollbar]:hidden">
          {dictionary.approach.values.map((value, i) => (
            <li
              key={value.title}
              className="card-soft w-[min(17.5rem,78vw)] shrink-0 snap-start bg-white p-5 md:w-auto md:min-w-0"
            >
              <Reveal delay={i * 0.04}>
                <span className="font-display text-2xl font-bold text-[color:var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-semibold text-[color:var(--ink)]">
                  {value.title}
                </h3>
                {value.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                    {value.description}
                  </p>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
