"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { useDictionary, useLocale } from "@/components/providers/LocaleProvider";
import { BackLink } from "@/components/site/BackLink";
import { Button } from "@/shared/ui/Button";
import { Section } from "@/shared/ui/Section";
import { SoftImage } from "@/shared/ui/SoftImage";
import { breakpoints, space } from "@/shared/tokens";

function LabContent() {
  const dictionary = useDictionary();
  const { locale } = useLocale();

  return (
    <main
      data-nav-surface="light"
      className="min-h-screen bg-[color:var(--bg)] pb-24 text-[color:var(--ink)]"
    >
      <div className="container-herna py-10">
        <BackLink href={`/${locale}`}>{dictionary.ui.backHome}</BackLink>

        <h1 className="heading-display mt-12 text-display-md">Component Lab</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-[color:var(--muted)]">
          Isolated UI checks for TSALACH design system (light only).
        </p>

        <div className="mt-16">
          <h2 className="heading-display text-display-sm">Buttons</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#top">Primary CTA</Button>
            <Button variant="outline" href="#top">
              Secondary
            </Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <Section className="!px-0 mt-8">
          <h2 className="heading-display text-display-sm">SoftImage</h2>
          <div className="relative mt-6 h-56 w-full max-w-xl overflow-hidden rounded-2xl">
            <SoftImage
              src="/divisions/energy.png"
              alt="Sample division visual"
              fill
              sizes="512px"
              className="object-cover"
            />
          </div>
        </Section>

        <div className="mt-16 grid gap-4 text-sm text-[color:var(--muted)]">
          <p>Space scale: {Object.values(space).join(" / ")} px</p>
          <p>
            Breakpoints: mobile {breakpoints.mobile} · desktop{" "}
            {breakpoints.desktop} · large {breakpoints.large}
          </p>
          <p>Copy check — Vision: {dictionary.vision.body.slice(0, 72)}…</p>
        </div>
      </div>
    </main>
  );
}

export default function LabPage() {
  return (
    <ThemeProvider>
      <LabContent />
    </ThemeProvider>
  );
}
