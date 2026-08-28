const ITEMS = [
  "Fully Insured",
  "Building-Regs Compliant",
  "Workmanship Guaranteed",
  "Free Consultation",
  "One Trusted Team",
  "Transparent Pricing",
  "15+ Years Experience",
  "200+ Projects Delivered",
];

/**
 * An infinite, edge-faded marquee of trust signals. The list is duplicated so
 * the -50% keyframe loops seamlessly; motion pauses for reduced-motion users.
 */
export default function TrustMarquee() {
  return (
    <div className="border-y border-ink-line bg-ink py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-silver-muted">
                {item}
              </span>
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
