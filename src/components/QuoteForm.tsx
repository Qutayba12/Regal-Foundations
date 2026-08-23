"use client";

import { useState } from "react";
import { services, site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      // ─────────────────────────────────────────────────────────────
      // TODO: connect the real sending method here (decided later).
      // Recommended: Web3Forms / Formspree — just POST `data` to the
      // endpoint and remove the simulated delay below. Example:
      //
      // await fetch("https://api.web3forms.com/submit", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ access_key: "YOUR_KEY", ...data }),
      // });
      // ─────────────────────────────────────────────────────────────
      await new Promise((r) => setTimeout(r, 900));
      void data;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card-surface flex flex-col items-center p-10 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-sheen text-ink">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-2xl uppercase text-cream">
          Thank you
        </h3>
        <p className="mt-2 max-w-sm text-silver">
          Your enquiry has been received. A member of the {site.name} team will be
          in touch within one working day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-8"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required>
          <input {...inputProps} name="name" required placeholder="Jane Doe" />
        </Field>
        <Field label="Phone" name="phone" required>
          <input {...inputProps} name="phone" type="tel" required placeholder="07123 456789" />
        </Field>
        <Field label="Email" name="email">
          <input {...inputProps} name="email" type="email" placeholder="jane@example.com" />
        </Field>
        <Field label="Postcode" name="postcode">
          <input {...inputProps} name="postcode" placeholder="SW1A 1AA" />
        </Field>
        <Field label="Service" name="service" full>
          <select {...inputProps} name="service" defaultValue="">
            <option value="" disabled>
              Select a service…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Something else</option>
          </select>
        </Field>
        <Field label="Tell us about your project" name="message" full>
          <textarea
            {...inputProps}
            name="message"
            rows={4}
            placeholder="I'm looking to add a rear kitchen extension…"
            className={`${inputProps.className} resize-none`}
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Something went wrong. Please call or WhatsApp us instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold mt-7 w-full disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request My Free Quote"}
      </button>
      <p className="mt-4 text-center text-xs text-silver-muted">
        No obligation · We reply within one working day
      </p>
    </form>
  );
}

const inputProps = {
  className:
    "w-full rounded-lg border border-ink-line bg-ink px-4 py-3 text-sm text-cream placeholder:text-silver-muted/60 outline-none transition-colors focus:border-gold",
} as const;

function Field({
  label,
  name,
  required,
  full,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`} htmlFor={name}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-silver">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
