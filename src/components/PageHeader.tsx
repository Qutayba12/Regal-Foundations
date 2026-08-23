import Link from "next/link";

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
    <section className="relative overflow-hidden border-b border-ink-line pt-32 pb-16">
      <div className="absolute inset-0 bg-hero-grid bg-[size:44px_44px] opacity-70" />
      <div className="absolute -right-32 -top-20 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="container-x relative">
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-silver-muted">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-gold">{breadcrumb ?? title}</span>
        </nav>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="display-title text-5xl text-cream sm:text-6xl">
          {title} {highlight && <span className="text-gold-gradient">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
