"use client";

import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  download?: string | boolean;
};

/** Soft magnetic pull toward cursor — desktop institutional micro-interaction */
export function MagneticButton({
  children,
  className = "",
  href,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
  style,
  target,
  rel,
  download,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el || reduced || window.matchMedia("(pointer: coarse)").matches) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    },
    [reduced],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }, []);

  const sharedClass = `magnetic-btn inline-flex items-center justify-center transition-transform duration-300 ease-out will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C69214] ${className}`;

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClass}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        data-cursor-hover
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      className={sharedClass}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor-hover
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
