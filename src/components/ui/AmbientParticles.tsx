"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useRef } from "react";

/** Subtle floating particle field — GPU-light canvas layer */
export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const density = window.innerWidth < 640 ? 28 : 55;
    const particles = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.4,
      s: 0.00015 + Math.random() * 0.00035,
      a: 0.15 + Math.random() * 0.35,
    }));

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const isLight = theme === "light";
      for (const p of particles) {
        p.y -= p.s;
        if (p.y < -0.02) p.y = 1.02;
        ctx.beginPath();
        ctx.fillStyle = isLight
          ? `rgba(107, 36, 36, ${p.a * 0.55})`
          : `rgba(212, 175, 55, ${p.a})`;
        ctx.arc(p.x * window.innerWidth, p.y * window.innerHeight, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, theme]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-70"
      aria-hidden="true"
    />
  );
}
