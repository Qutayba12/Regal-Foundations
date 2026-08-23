import { site } from "@/lib/site";

/** The real Regal Foundations emblem (crown + R), served from /public. */
export function Emblem({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-emblem.svg"
      alt={`${site.name} emblem`}
      className={className}
      draggable={false}
    />
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
      <Emblem className="h-12 w-auto" />
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
