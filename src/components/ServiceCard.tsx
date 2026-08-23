import Link from "next/link";
import Reveal from "./Reveal";
import type { Service } from "@/lib/site";

function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  const common = "h-7 w-7";
  if (icon === "extension") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V10l6-4 6 4v11" />
        <path d="M15 21V13h6v8" />
        <path d="M3 21h18" />
        <path d="M8 21v-5h3v5" />
      </svg>
    );
  }
  if (icon === "renovation") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1z" />
        <path d="m14 14 5 5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="m3 13 9 5 9-5" />
      <path d="M12 13v8" />
    </svg>
  );
}

export default function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="group card-surface h-full p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card">
        <div className="mb-6 grid h-14 w-14 place-items-center rounded-xl border border-gold/25 bg-ink text-gold transition-colors group-hover:bg-gold-sheen group-hover:text-ink">
          <ServiceIcon icon={service.icon} />
        </div>
        <h3 className="font-display text-2xl uppercase tracking-wide text-cream">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-silver">
          {service.description}
        </p>
        <ul className="mt-6 space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-silver-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
              {f}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold transition-all group-hover:gap-3"
        >
          Enquire
          <span aria-hidden>→</span>
        </Link>
      </div>
    </Reveal>
  );
}
