import Link from "next/link";
import Logo from "./Logo";
import { nav, services, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-line bg-ink-soft">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-silver-muted">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver-muted">
            Premium construction, renovation &amp; extensions across{" "}
            {site.contact.serviceArea}.
          </p>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Explore
          </h4>
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-silver transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Services
          </h4>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href="/services"
                  className="text-sm text-silver transition-colors hover:text-cream"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-silver">
            <li>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="transition-colors hover:text-cream"
              >
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-cream"
              >
                {site.contact.email}
              </a>
            </li>
            <li>{site.contact.address}</li>
            <li className="text-silver-muted">{site.contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-silver-muted sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="tracking-wide">
            Building Today · Supporting Tomorrow · Standing Forever
          </p>
        </div>
      </div>
    </footer>
  );
}
