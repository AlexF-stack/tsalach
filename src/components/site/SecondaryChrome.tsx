"use client";

import { useDictionary } from "@/components/providers/LocaleProvider";
import { TsaNav } from "@/components/tsa/TsaNav";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Chrome for secondary routes. Home uses Experience. */
export function SecondaryChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const dictionary = useDictionary();
  const isHome = /^\/(en|fr)\/?$/.test(pathname);

  return (
    <ThemeProvider>
      {!isHome ? (
        <>
          <a href="#main" className="skip-link">
            {dictionary.ui.skipToContent}
          </a>
          <TsaNav />
          <div id="main">{children}</div>
        </>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}
