"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { HashScroll } from "@/components/site/HashScroll";
import { TsaFloatContact } from "@/components/tsa/TsaFloatContact";
import { TsaHero } from "@/components/tsa/TsaHero";
import { TsaNav } from "@/components/tsa/TsaNav";
import { TsaTrust } from "@/components/tsa/TsaTrust";
import dynamic from "next/dynamic";

/** Below-fold sections — code-split to shrink first paint JS. */
const TsaIntro = dynamic(() =>
  import("@/components/tsa/TsaIntro").then((m) => m.TsaIntro),
);
const TsaVision = dynamic(() =>
  import("@/components/tsa/TsaVision").then((m) => m.TsaVision),
);
const TsaProcess = dynamic(() =>
  import("@/components/tsa/TsaProcess").then((m) => m.TsaProcess),
);
const TsaObjet = dynamic(() =>
  import("@/components/tsa/TsaObjet").then((m) => m.TsaObjet),
);
const TsaDomains = dynamic(() =>
  import("@/components/tsa/TsaDomains").then((m) => m.TsaDomains),
);
const TsaDna = dynamic(() =>
  import("@/components/tsa/TsaDna").then((m) => m.TsaDna),
);
const TsaPromise = dynamic(() =>
  import("@/components/tsa/TsaPromise").then((m) => m.TsaPromise),
);
const TsaAdvantages = dynamic(() =>
  import("@/components/tsa/TsaAdvantages").then((m) => m.TsaAdvantages),
);
const TsaSectors = dynamic(() =>
  import("@/components/tsa/TsaSectors").then((m) => m.TsaSectors),
);
const TsaAmbition = dynamic(() =>
  import("@/components/tsa/TsaAmbition").then((m) => m.TsaAmbition),
);
const TsaClosing = dynamic(() =>
  import("@/components/tsa/TsaClosing").then((m) => m.TsaClosing),
);
const TsaContact = dynamic(() =>
  import("@/components/tsa/TsaContact").then((m) => m.TsaContact),
);
const TsaFooter = dynamic(() =>
  import("@/components/tsa/TsaFooter").then((m) => m.TsaFooter),
);

export function Experience() {
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
