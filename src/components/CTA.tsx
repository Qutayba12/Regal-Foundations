import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-ink-soft px-8 py-16 text-center sm:px-16">
            {/* corner glows — radial gradients (no blur filter) so iOS
                Safari doesn't flash a square bounding box on load */}
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-80 w-80"
              style={{ background: "radial-gradient(circle, rgba(201,162,75,0.12), transparent 62%)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80"
              style={{ background: "radial-gradient(circle, rgba(201,162,75,0.12), transparent 62%)" }}
            />
            <p className="eyebrow justify-center">Ready to build?</p>
            <h2 className="display-title mx-auto max-w-3xl text-4xl text-cream sm:text-5xl">
              Let’s turn your house into the home that{" "}
              <span className="text-gold-gradient">stands forever.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-silver">
              Book your free, no-obligation consultation today. We’ll visit, listen,
              and give you a clear, honest quote.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-gold">
                Get a Free Quote
              </Link>
              <a href={`tel:${site.contact.phoneHref}`} className="btn-ghost">
                Call {site.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
