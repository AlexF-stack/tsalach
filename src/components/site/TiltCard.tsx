"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import {
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

/** Perspective tilt card — 3D hover without extra 3D libs. */
export function TiltCard({
  children,
  className = "",
  intensity = 14,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 180,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 180,
    damping: 18,
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`[transform-style:preserve-3d] ${className}`}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
