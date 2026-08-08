"use client";

export function ScrollIndicator({ className }: { className?: string }) {
  return (
    <div
      className={`scroll-indicator ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="scroll-indicator__line">
        <span className="scroll-indicator__dot" />
      </div>
    </div>
  );
}
