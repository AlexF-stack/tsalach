import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  "aria-labelledby"?: string;
};

/** Shared section shell — consistent z-index & vertical rhythm */
export function Section({
  id,
  children,
  className = "",
  as: Tag = "section",
  "aria-labelledby": labelledBy,
}: Props) {
  return (
    <Tag
      id={id}
      className={`relative z-20 py-24 md:py-32 ${className}`}
      aria-labelledby={labelledBy}
    >
      <div className="container-herna">{children}</div>
    </Tag>
  );
}
