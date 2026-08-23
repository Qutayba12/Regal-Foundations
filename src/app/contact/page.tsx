import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free, no-obligation quote from Regal Foundations. Call, WhatsApp or send us your project details and we'll be in touch within one working day.",
};

const waText = encodeURIComponent(
  "Hi Regal Foundations, I'd like a free quote for my project.",
);

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-ink text-gold">
        {icon}
      </span>
      <div>
        <span className="block text-xs uppercase tracking-wider text-silver-muted">
          {label}
        </span>
        <span className="block font-semibold text-cream">{value}</span>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's Start"
        highlight="Building"
        subtitle="Tell us about your project and we'll get back to you within one working day with honest advice and a free quote."
      />

      <section className="py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Details */}
          <div>
            <h2 className="font-display text-3xl uppercase text-cream">
              Talk to a real builder
            </h2>
            <p className="mt-4 text-silver">
              No call centres, no pushy sales. Just straightforward advice from the
              team who will actually do the work.
            </p>

            <div className="mt-10 space-y-6">
              <ContactRow
                label="Call us"
                value={site.contact.phoneDisplay}
                href={`tel:${site.contact.phoneHref}`}
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
                  </svg>
                }
              />
              <ContactRow
                label="WhatsApp"
                value="Message us anytime"
                href={`https://wa.me/${site.contact.whatsappNumber}?text=${waText}`}
                icon={
                  <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden>
                    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.3l-.4-.2-4.9 1 1-4.8-.3-.4A9.7 9.7 0 016.2 15c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8z" />
                  </svg>
                }
              />
              <ContactRow
                label="Email"
                value={site.contact.email}
                href={`mailto:${site.contact.email}`}
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                }
              />
              <ContactRow
                label="Service area"
                value={site.contact.serviceArea}
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" aria-hidden>
                    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                }
              />
            </div>

            <div className="mt-10 card-surface p-6">
              <span className="text-xs uppercase tracking-wider text-silver-muted">
                Opening hours
              </span>
              <p className="mt-1 font-semibold text-cream">{site.contact.hours}</p>
              <p className="mt-3 text-sm text-silver">
                Emergency &amp; out-of-hours enquiries — leave a message and we’ll
                call you back first thing.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
