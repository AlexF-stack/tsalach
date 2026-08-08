"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/tsa/Reveal";

export function TsaPromise() {
  const dictionary = useDictionary();

  return (
    <section
      id="promise"
      data-nav-surface="light"
      className="section-pad bg-white"
      aria-labelledby="promise-heading"
    >
      <div className="container-tsa max-w-3xl">
        <Reveal>
          <p className="label-act">{dictionary.promise.label}</p>
          <h2
            id="promise-heading"
            className="heading-display mt-4 text-display-md"
          >
            {dictionary.promise.headline}
          </h2>
          <p className="mt-5 text-[color:var(--muted)]">
            {dictionary.promise.intro}
          </p>
        </Reveal>

        <ol className="mt-12 space-y-4">
          {dictionary.promise.steps.map((step, i) => (
            <li key={step}>
              <Reveal delay={i * 0.05}>
                <div className="card-soft flex gap-4 bg-[color:var(--bg-soft)] p-5 sm:p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] font-display text-sm font-bold text-white shadow-[0_8px_20px_var(--accent-glow)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1.5 font-display text-lg font-semibold leading-snug text-[color:var(--ink)] md:text-xl">
                    {step}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-8">
          <p className="font-display text-xl font-bold tracking-wide text-[color:var(--accent)] md:text-2xl">
            {dictionary.promise.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
