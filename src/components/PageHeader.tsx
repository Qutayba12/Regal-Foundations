import Link from "next/link";
import SceneBackground from "./SceneBackground";

export default function PageHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden border-b border-ink-line pt-32 pb-14">
      <SceneBackground />
      <div className="container-x relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-silver-muted">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-gold">{breadcrumb ?? title}</span>
        </nav>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="display-title text-5xl text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-6xl">
          {title} {highlight && <span className="text-gold-gradient">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver drop-shadow-[0_1px_12px_rgba(0,0,0,0.7)]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
