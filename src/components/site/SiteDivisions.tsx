"use client";

import {
  useDictionary,
  useLocale,
} from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import { SoftImage } from "@/shared/ui/SoftImage";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { MouseEvent } from "react";

function DivisionCard({
  item,
  index,
  viewLabel,
}: {
  item: {
    id: string;
    title: string;
    description: string;
    accent: string;
    imageSrc: string;
  };
  index: number;
  viewLabel: string;
}) {
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0) scale(1.08)`;

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px * -12);
    y.set(py * -12);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Reveal delay={index * 0.06}>
      <TiltCard intensity={8} className="h-full">
        <a
          href={`/${locale}/divisions/${item.id}`}
          id={`division-${item.id}`}
          data-cursor-hover
          className="group relative isolate block h-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-elevated)] shine-border cursor-grow"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <div className="relative aspect-[16/11] overflow-hidden">
            <motion.div
              className="absolute inset-[-8%]"
              style={reduced ? undefined : { transform }}
            >
              <SoftImage
                src={item.imageSrc}
                alt={item.title}
                fill
                quality={70}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                wrapperClassName="absolute inset-0"
              />
            </motion.div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-[rgba(10,12,16,0.9)] via-[rgba(10,12,16,0.25)] to-transparent"
              aria-hidden
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[color:var(--gold)] transition-transform duration-700 ease-out group-hover:scale-x-100"
              style={{ background: item.accent }}
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-xl text-white md:text-2xl">
                {item.title}
              </h3>
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 p-6 pt-5">
            <p className="text-sm leading-relaxed text-[color:var(--muted)]">
              {item.description}
            </p>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-[color:var(--gold)] transition group-hover:gap-2.5">
              {viewLabel}
              <span aria-hidden>→</span>
            </span>
          </div>
        </a>
      </TiltCard>
    </Reveal>
  );
}

export function SiteDivisions() {
  const dictionary = useDictionary();

  return (
    <section
      id="divisions"
      data-nav-surface="light"
      className="section-pad"
      aria-labelledby="divisions-heading"
    >
      <div className="container-herna">
        <Reveal className="max-w-2xl">
          <p className="label-act">{dictionary.divisions.sectionLabel}</p>
          <h2
            id="divisions-heading"
            className="heading-display mt-4 text-display-md"
          >
            {dictionary.divisions.headline}
          </h2>
          <p className="mt-5 text-body-lg text-[color:var(--muted)]">
            {dictionary.divisions.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.divisions.items.map((item, i) => (
            <DivisionCard
              key={item.id}
              item={item}
              index={i}
              viewLabel={dictionary.ui.viewDivision}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
