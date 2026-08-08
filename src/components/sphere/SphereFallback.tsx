"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Static fallback when prefers-reduced-motion or low-GPU.
 * Light mode: soft earth-like disc; dark: metallic orb.
 */
export function SphereFallback({ className }: { className?: string }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        background: isLight
          ? "radial-gradient(circle at 45% 40%, #dce8f2 0%, #fbfaf7 55%, #fbfaf7 100%)"
          : "radial-gradient(circle at 45% 42%, #1a1814 0%, #040404 55%, #040404 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{
            width: "min(52vw, 420px)",
            height: "min(52vw, 420px)",
            background: isLight
              ? "radial-gradient(circle at 35% 30%, #6B9AC4 0%, #163048 45%, #0E2030 70%), radial-gradient(circle at 70% 65%, rgba(107,36,36,0.35) 0%, transparent 45%)"
              : "radial-gradient(circle at 35% 30%, #2a2418 0%, #040404 45%, #050505 70%), radial-gradient(circle at 70% 65%, rgba(212,175,55,0.35) 0%, transparent 45%)",
            boxShadow: isLight
              ? "inset 0 0 60px rgba(22,48,72,0.2), 0 20px 80px rgba(22,48,72,0.12)"
              : "inset 0 0 60px rgba(212,175,55,0.15), 0 0 80px rgba(212,175,55,0.08)",
            border: isLight
              ? "1px solid rgba(22,48,72,0.15)"
              : "1px solid rgba(212,175,55,0.12)",
          }}
        />
      </div>
    </div>
  );
}
