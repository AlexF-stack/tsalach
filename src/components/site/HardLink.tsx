"use client";

import type { ReactNode, AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/** Hard-navigates so hash routes like /en#divisions always land correctly. */
export function HardLink({ href, children, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        window.location.assign(href);
      }}
    >
      {children}
    </a>
  );
}
