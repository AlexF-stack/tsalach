"use client";

import { brandAssets } from "@/content/brand";
import Image from "next/image";

type Props = {
  /** light | dark = full plaquette lockup; nav = compact header lockup */
  variant?: "light" | "dark" | "nav";
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  alt?: string;
};

/** Official TSALACH lockup — /brand/tsalach-logo-clear.png */
export function BrandLogo({
  variant = "light",
  className = "h-11 w-auto object-contain sm:h-12 md:h-14",
  priority = false,
  width = 220,
  height = 190,
  alt,
}: Props) {
  const src =
    variant === "nav"
      ? brandAssets.logoNavClearSrc
      : brandAssets.logoClearSrc;

  const w = variant === "nav" ? 240 : width;
  const h = variant === "nav" ? 84 : height;

  return (
    <Image
      src={src}
      alt={alt ?? brandAssets.holdingName}
      width={w}
      height={h}
      className={className}
      priority={priority}
    />
  );
}
