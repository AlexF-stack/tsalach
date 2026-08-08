"use client";

import { HardLink } from "@/components/site/HardLink";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[color:var(--bg)] px-6 py-24 text-center text-[color:var(--ink)]">
      <p className="label-act">Erreur</p>
      <h1 className="heading-display mt-4 text-display-md">
        Une erreur est survenue
      </h1>
      <p className="mt-4 max-w-md text-[color:var(--muted)]">
        {error.message || "Impossible d'afficher cette page pour le moment."}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" className="btn-primary" onClick={() => reset()}>
          Réessayer
        </button>
        <HardLink href="/fr" className="btn-secondary">
          Accueil
        </HardLink>
      </div>
    </main>
  );
}
