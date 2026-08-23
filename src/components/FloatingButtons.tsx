"use client";

import { site } from "@/lib/site";

export default function FloatingButtons() {
  const waText = encodeURIComponent(
    "Hi Regal Foundations, I'd like a free quote for my project.",
  );
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${site.contact.whatsappNumber}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden>
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.3l-.4-.2-4.9 1 1-4.8-.3-.4A9.7 9.7 0 016.2 15c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
        </svg>
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-ink-card px-3 py-1.5 text-xs text-cream opacity-0 shadow transition-opacity group-hover:opacity-100">
          WhatsApp us
        </span>
      </a>
      <a
        href={`tel:${site.contact.phoneHref}`}
        aria-label="Call us"
        className="group grid h-14 w-14 place-items-center rounded-full bg-gold-sheen text-ink shadow-gold transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
        </svg>
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-ink-card px-3 py-1.5 text-xs text-cream opacity-0 shadow transition-opacity group-hover:opacity-100">
          Call now
        </span>
      </a>
    </div>
  );
}
