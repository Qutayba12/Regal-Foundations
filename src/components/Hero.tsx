"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LogoStage from "./LogoStage";
import { site } from "@/lib/site";

const tagParts = site.tagline.split("·").map((s) => s.trim());

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-grid bg-[size:44px_44px]" />
      <div className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[130px]" />
      <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-silver/5 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow justify-center lg:justify-start"
          >
            Premium Builders · {site.contact.serviceArea}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="display-title text-5xl text-cream sm:text-6xl lg:text-7xl"
          >
            Built to Stand
            <span className="block text-gold-gradient">Forever.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-silver lg:mx-0"
          >
            {site.name} delivers extensions, full renovations and bespoke interior
            finishes across the UK — the craftsmanship of a master builder, the
            care of a trusted partner.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <Link href="/contact" className="btn-gold">
              Get a Free Quote
            </Link>
            <Link href="/projects" className="btn-ghost">
              View Our Work
            </Link>
          </motion.div>

          {/* Tagline chips */}
          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-silver-muted lg:justify-start"
          >
            {tagParts.map((part) => (
              <li key={part} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                {part}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Interactive 3D emblem */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <LogoStage />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-silver-muted lg:flex">
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
