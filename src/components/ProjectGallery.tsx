"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/site";

const categories = ["All", "Extensions", "Renovation", "Décor"] as const;
type Category = (typeof categories)[number];

function ProjectTile({ project }: { project: Project }) {
  const [showBefore, setShowBefore] = useState(false);
  const bgStyle = (v: string) =>
    v.startsWith("http") || v.startsWith("/")
      ? { backgroundImage: `url(${v})`, backgroundSize: "cover", backgroundPosition: "center" }
      : { backgroundImage: v };

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      onHoverStart={() => setShowBefore(true)}
      onHoverEnd={() => setShowBefore(false)}
      onClick={() => setShowBefore((v) => !v)}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink-line text-left"
    >
      <div className="absolute inset-0" style={bgStyle(project.after)} />
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${showBefore ? "opacity-100" : "opacity-0"}`}
        style={bgStyle(project.before)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-gold backdrop-blur">
        {showBefore ? "Before" : "After"}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
          {project.category}
        </span>
        <h3 className="mt-1 font-display text-xl uppercase tracking-wide text-cream">
          {project.title}
        </h3>
        <p className="text-sm text-silver-muted">{project.location}</p>
      </div>
    </motion.button>
  );
}

export default function ProjectGallery({ limit }: { limit?: number }) {
  const [active, setActive] = useState<Category>("All");
  const filtered = projects
    .filter((p) => active === "All" || p.category === active)
    .slice(0, limit);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              active === c
                ? "border-gold bg-gold-sheen text-ink"
                : "border-ink-line text-silver hover:border-gold/50 hover:text-gold"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectTile key={p.title} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-8 text-center text-xs text-silver-muted">
        Tip: hover or tap a project to reveal the “before”.
      </p>
    </div>
  );
}
