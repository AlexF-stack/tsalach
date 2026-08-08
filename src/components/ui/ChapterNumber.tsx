type Props = {
  number: string;
  label: string;
  className?: string;
};

/** Giant chapter index — editorial chapter markers */
export function ChapterNumber({ number, label, className = "" }: Props) {
  return (
    <div className={`mb-6 flex flex-wrap items-end gap-4 md:gap-6 ${className}`}>
      <span
        className="font-display text-[clamp(3.5rem,10vw,7.5rem)] leading-none tracking-[-0.04em] text-[color:var(--chapter-number)]"
        aria-hidden="true"
      >
        {number}
      </span>
      <p className="label-act mb-2 md:mb-4">{label}</p>
    </div>
  );
}
