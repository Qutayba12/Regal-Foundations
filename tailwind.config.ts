import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0D", // deep charcoal black (page background)
          soft: "#111217",
          card: "#15161C",
          line: "#22242C",
        },
        gold: {
          DEFAULT: "#C9A24B", // regal gold accent
          soft: "#E4C77E",
          deep: "#9C7A2E",
        },
        silver: {
          DEFAULT: "#C7CBD1", // metallic silver
          soft: "#E7E9ED",
          muted: "#8A8F98",
        },
        cream: "#F5F5F3",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Oswald", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(135deg, #E4C77E 0%, #C9A24B 45%, #9C7A2E 100%)",
        "silver-sheen":
          "linear-gradient(135deg, #F2F3F5 0%, #C7CBD1 45%, #8A8F98 100%)",
        "hero-grid":
          "linear-gradient(to right, rgba(201,162,75,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,162,75,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        gold: "0 10px 40px -12px rgba(201,162,75,0.45)",
        card: "0 24px 60px -30px rgba(0,0,0,0.85)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        shimmer: "shimmer 6s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
