import { site } from "@/lib/site";

/** The regal crown mark, drawn as an inline SVG so it stays crisp at any size. */
function CrownMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 68"
      className={className}
      role="img"
      aria-label="Regal Foundations crown emblem"
    >
      <defs>
        <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2F3F5" />
          <stop offset="45%" stopColor="#C7CBD1" />
          <stop offset="100%" stopColor="#8A8F98" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E4C77E" />
          <stop offset="50%" stopColor="#C9A24B" />
          <stop offset="100%" stopColor="#9C7A2E" />
        </linearGradient>
      </defs>
      {/* Crown body */}
      <path
        d="M8,52 L18,20 L32,40 L50,10 L68,40 L82,20 L92,52 Z"
        fill="url(#silverGrad)"
        stroke="#6f7580"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Base band */}
      <rect x="8" y="52" width="84" height="11" rx="3" fill="url(#goldGrad)" />
      {/* Jewels */}
      <circle cx="18" cy="18" r="4" fill="url(#goldGrad)" />
      <circle cx="50" cy="8" r="5" fill="url(#goldGrad)" />
      <circle cx="82" cy="18" r="4" fill="url(#goldGrad)" />
    </svg>
  );
}

export default function Logo({
  withText = true,
  className = "",
}: {
  withText?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-ink-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <CrownMark className="absolute left-1/2 top-1 h-3.5 w-6 -translate-x-1/2" />
        <span className="mt-2 font-display text-2xl leading-none text-silver-gradient">
          R
        </span>
      </span>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-[0.15em] text-silver-gradient">
            REGAL
          </span>
          <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.4em] text-gold">
            Foundations
          </span>
        </span>
      )}
      <span className="sr-only">{site.name}</span>
    </span>
  );
}

export { CrownMark };
