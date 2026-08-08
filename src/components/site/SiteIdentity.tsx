"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { ApproachOrbit } from "@/components/site/ApproachOrbit";
import { Reveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";

export function SiteIdentity() {
  const dictionary = useDictionary();
  const { locale } = useLocale();
  const hint =
    locale === "fr"
      ? "Survolez ou touchez une boule"
      : "Hover or tap a sphere";

  return (
    <section
      id="identity"
      data-nav-surface="gold"
      className="section-gold section-pad relative overflow-hidden border-y"
      aria-labelledby="identity-heading"
      style={{ perspective: "1400px" }}
    >
      <div className="container-herna">
        <Reveal>
          <p className="label-act">{dictionary.identity.label}</p>
          <h2
            id="identity-heading"
            className="heading-display mt-4 max-w-[18ch] text-display-md"
          >
            {dictionary.identity.headline}
          </h2>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-4" delay={0.04}>
            <TiltCard intensity={10} className="h-full">
              <article
                id="vision"
                className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--bg-elevated)] p-7 shadow-[0_16px_40px_rgba(10,14,26,0.06)] sm:p-8"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--gold) 28%, transparent), transparent 70%)",
                  }}
                  aria-hidden
                />
                <p className="label-act relative">{dictionary.vision.label}</p>
                <p className="relative mt-6 font-display text-[clamp(1.2rem,2.6vw,1.65rem)] leading-snug tracking-tight text-[color:var(--ink)]">
                  {dictionary.vision.body}
                </p>
              </article>
            </TiltCard>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={0.08}>
            <TiltCard intensity={10} className="h-full">
              <article
                id="mission"
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--navy-deep)] p-7 text-white shadow-[0_20px_50px_rgba(10,14,26,0.28)] sm:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{
                    background:
                      "radial-gradient(90% 80% at 100% 0%, rgba(201,162,75,0.28), transparent 50%), radial-gradient(70% 60% at 0% 100%, rgba(26,36,51,0.55), transparent 55%)",
                  }}
                  aria-hidden
                />
                <p className="label-act relative text-[color:var(--gold-soft)]">
                  {dictionary.mission.label}
                </p>
                <p className="relative mt-6 text-body-lg text-white/82">
                  {dictionary.mission.body}
                </p>
              </article>
            </TiltCard>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={0.12}>
            <TiltCard intensity={10} className="h-full">
              <article
                id="purpose"
                className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/35 bg-[color:var(--bg-elevated)] p-7 shadow-[0_16px_40px_rgba(10,14,26,0.06)] sm:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, color-mix(in srgb, var(--gold) 12%, transparent), transparent 55%)",
                  }}
                  aria-hidden
                />
                <p className="label-act relative text-[color:var(--gold)]">
                  {dictionary.purpose.label}
                </p>
                <p className="relative mt-6 font-display text-[clamp(1.2rem,2.6vw,1.65rem)] leading-snug tracking-tight text-[color:var(--ink)]">
                  {dictionary.purpose.body}
                </p>
                <p className="relative mt-auto pt-8 text-sm italic text-[color:var(--muted)]">
                  {dictionary.about.purpose}
                </p>
              </article>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-16" delay={0.1}>
          <ApproachOrbit
            label={dictionary.approach.label}
            intro={dictionary.approach.intro}
            values={dictionary.approach.values}
            hint={hint}
          />
        </Reveal>
      </div>
    </section>
  );
}
