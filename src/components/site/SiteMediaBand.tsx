"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { CinematicMedia } from "@/components/site/CinematicMedia";
import { Reveal } from "@/components/site/Reveal";

export function SiteMediaBand() {
  const dictionary = useDictionary();

  return (
    <section
      className="relative isolate overflow-hidden"
      data-nav-surface="dark"
      aria-labelledby="media-band-heading"
    >
      <div className="relative min-h-[52svh] md:min-h-[62svh]">
        <CinematicMedia
          images={[
            "/divisions/agriculture.png",
            "/divisions/energy.png",
            "/divisions/equipment.png",
          ]}
          kenBurns
          cycleMs={5500}
          overlayStyle={{
            background:
              "linear-gradient(180deg, rgba(10,14,26,0.4) 0%, rgba(10,14,26,0.78) 55%, rgba(10,14,26,0.92) 100%)",
          }}
        />
        <div className="container-herna relative z-10 flex min-h-[52svh] items-end pb-14 pt-24 md:min-h-[62svh] md:pb-20">
          <Reveal className="max-w-2xl">
            <p className="label-act text-white/85">{dictionary.mediaBand.label}</p>
            <h2
              id="media-band-heading"
              className="heading-display mt-4 text-display-md text-white"
            >
              {dictionary.mediaBand.headline}
            </h2>
            <p className="mt-5 max-w-xl text-body-lg text-white/72">
              {dictionary.mediaBand.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
