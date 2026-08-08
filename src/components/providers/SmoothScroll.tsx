"use client";

import type { ReactNode } from "react";

/**
 * Native scroll — Lenis was intercepting / racing navigation clicks.
 * Can be reintroduced later with anchors disabled and careful click handling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
