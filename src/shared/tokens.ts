/**
 * Design tokens — single source for spacing & type scales (CSS vars remain source of colors).
 */
export const space = {
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  5: 48,
  6: 64,
  7: 96,
  8: 128,
} as const;

export const breakpoints = {
  mobile: 640,
  tablet: 1024,
  desktop: 1024,
  large: 1600,
} as const;

export const motion = {
  duration: 0.6,
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const mq = {
  desktopPin: "(min-width: 1024px)",
  mobileStack: "(max-width: 1023px)",
  finePointer: "(pointer: fine)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
