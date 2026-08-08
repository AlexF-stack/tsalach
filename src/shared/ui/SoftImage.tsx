"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "onLoad"> & {
  wrapperClassName?: string;
};

/** Soft blur-up image shell for cinematic sections */
export function SoftImage({
  className = "",
  wrapperClassName = "",
  alt,
  fill,
  quality = 65,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${fill ? "h-full w-full" : ""} ${wrapperClassName}`}
    >
      <div
        className={`absolute inset-0 z-[1] bg-[color:var(--surface)] transition-opacity duration-[600ms] ease-out ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden
      />
      <Image
        {...props}
        fill={fill}
        alt={alt}
        quality={quality}
        className={`${className} transition-[filter,opacity,transform] duration-[700ms] ease-out ${
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-70 blur-md scale-105"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
