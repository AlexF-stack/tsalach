"use client";

import {
  useCallback,
  useRef,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
  style?: CSSProperties;
};

/** Soft magnetic pull toward cursor — desktop luxury micro-interaction */
export function MagneticButton({
  children,
  className = "",
  href,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
  style,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }, []);

  const sharedClass = `magnetic-btn inline-flex transition-transform duration-300 ease-out will-change-transform ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClass}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        data-cursor-hover
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
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
