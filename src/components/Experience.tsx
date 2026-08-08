"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { useDictionary } from "@/components/providers/LocaleProvider";
import { HashScroll } from "@/components/site/HashScroll";
import { TsaAdvantages } from "@/components/tsa/TsaAdvantages";
import { TsaAmbition } from "@/components/tsa/TsaAmbition";
import { TsaClosing } from "@/components/tsa/TsaClosing";
import { TsaContact } from "@/components/tsa/TsaContact";
import { TsaDna } from "@/components/tsa/TsaDna";
import { TsaDomains } from "@/components/tsa/TsaDomains";
import { TsaFooter } from "@/components/tsa/TsaFooter";
import { TsaHero } from "@/components/tsa/TsaHero";
import { TsaIntro } from "@/components/tsa/TsaIntro";
import { TsaNav } from "@/components/tsa/TsaNav";
import { TsaObjet } from "@/components/tsa/TsaObjet";
import { TsaProcess } from "@/components/tsa/TsaProcess";
import { TsaPromise } from "@/components/tsa/TsaPromise";
import { TsaSectors } from "@/components/tsa/TsaSectors";
import { TsaTrust } from "@/components/tsa/TsaTrust";
import { TsaVision } from "@/components/tsa/TsaVision";
import { TsaFloatContact } from "@/components/tsa/TsaFloatContact";

function ExperienceInner() {
  const dictionary = useDictionary();

  return (
    <>
      <a href="#main" className="skip-link">
        {dictionary.ui.skipToContent}
      </a>

      <HashScroll />

      <TsaNav />
      <main id="main">
        <TsaHero />
        <TsaTrust />
        <TsaIntro />
        <TsaVision />
        <TsaProcess />
        <TsaObjet />
        <TsaDomains />
        <TsaDna />
        <TsaPromise />
        <TsaAdvantages />
        <TsaSectors />
        <TsaAmbition />
        <TsaClosing />
        <TsaContact />
        <TsaFooter />
      </main>
      <TsaFloatContact />
    </>
  );
}

export function Experience() {
  return (
    <SmoothScroll>
      <ExperienceInner />
    </SmoothScroll>
  );
}
