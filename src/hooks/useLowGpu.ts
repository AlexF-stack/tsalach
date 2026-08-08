"use client";

import { useEffect, useState } from "react";

/**
 * Detects low-GPU / weak devices for static sphere fallback.
 * Conservative: skip live 3D on coarse pointers with small screens,
 * or when hardware concurrency is very low.
 */
export function useLowGpu(): boolean {
  const [low, setLow] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    const isMobile =
      window.matchMedia("(max-width: 639px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    const weak = cores <= 2 || (memory !== undefined && memory <= 2);
    setLow(weak && isMobile);
  }, []);

  return low;
}
