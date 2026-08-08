"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ReactNode } from "react";

type Variant = "outline" | "underline" | "ghost" | "primary";

type Props = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  magnetic?: boolean;
  "aria-label"?: string;
  disabled?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-secondary",
  underline: "link-underline",
  ghost:
    "inline-flex items-center justify-center px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--ink)]",
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  magnetic = false,
  "aria-label": ariaLabel,
  disabled,
}: Props) {
  const classes = `${variants[variant]} ${className} ${disabled ? "pointer-events-none opacity-50" : ""}`;

  if (magnetic && !disabled) {
    return (
      <MagneticButton
        href={href}
        type={type}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </MagneticButton>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
