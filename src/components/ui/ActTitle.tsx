type Props = {
  label: string;
  title?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function ActTitle({
  label,
  title,
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <div className={className}>
      <p className="label-act mb-4">{label}</p>
      {title ? (
        <Tag className="heading-display text-[clamp(1.75rem,5vw,3.5rem)]">
          {title}
        </Tag>
      ) : null}
    </div>
  );
}
