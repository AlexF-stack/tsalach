"use client";

import dynamic from "next/dynamic";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { SphereFallback } from "@/components/sphere/SphereFallback";
import { useLowGpu } from "@/hooks/useLowGpu";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useCallback, useEffect } from "react";

const HeritageSphere = dynamic(
  () =>
    import("@/components/sphere/HeritageSphere").then((m) => m.HeritageSphere),
  { ssr: false },
);

export function SceneStage() {
  const { setMouse, phase, introComplete } = useExperience();
  const reduced = usePrefersReducedMotion();
  const lowGpu = useLowGpu();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const useLive3d = !reduced && !lowGpu;

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (!isDesktop) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(x, y);
    },
    [isDesktop, setMouse],
  );

  useEffect(() => {
    if (!isDesktop || !useLive3d) return;
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, onMove, useLive3d]);

  const visible = phase !== "hidden";

  return (
    <div
      className="fixed inset-0 z-10 transition-opacity duration-[600ms] ease-out"
      style={{
        opacity: visible ? 1 : 0,
        filter: phase === "side" ? "blur(8px)" : "none",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={{
          pointerEvents:
            // Allow hotspot links in light mode / hero
            phase === "hero" ? "auto" : "none",
        }}
      >
        {useLive3d ? (
          <HeritageSphere className="h-full w-full" />
        ) : (
          <SphereFallback className="relative h-full w-full" />
        )}
      </div>
      {!introComplete && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "color-mix(in srgb, var(--bg-black) 40%, transparent)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
