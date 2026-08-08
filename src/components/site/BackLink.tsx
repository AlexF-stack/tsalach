"use client";

import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Hard navigation so hash targets (#divisions) always resolve. */
export function BackLink({ href, children, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-medium transition ${className || "text-[color:var(--muted)] hover:text-[#C69214]"}`}
      onClick={(e) => {
        e.preventDefault();
        window.location.assign(href);
      }}
    >
      <span aria-hidden>←</span>
      <span>{children}</span>
    </a>
  );
}
