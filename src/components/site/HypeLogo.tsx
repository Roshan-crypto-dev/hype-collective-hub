/** SVG logomark — auction-gavel diamond. */
export function HypeLogo({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {/* Diamond / drop body */}
      <path
        d="M16 2 L29 12 L16 30 L3 12 Z"
        fill="currentColor"
      />
      {/* Inner cut */}
      <path
        d="M16 2 L22 12 L16 30 L10 12 Z"
        fill="rgba(0,0,0,0.18)"
      />
      {/* Top facet */}
      <path d="M3 12 L29 12 L16 18 Z" fill="rgba(255,255,255,0.16)" />
      {/* Gold spark */}
      <circle cx="16" cy="12" r="1.6" fill="var(--gold, #d3a155)" />
    </svg>
  );
}
