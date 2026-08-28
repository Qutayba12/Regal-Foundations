import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import JsonLd from "@/components/JsonLd";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import GrainOverlay from "@/components/GrainOverlay";
import { site } from "@/lib/site";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute-URL base for og:image, canonical, etc. Update to the custom
  // domain (e.g. https://regalfoundations.co.uk) once it is connected.
  metadataBase: new URL("https://regal-foundations.vercel.app"),
  title: {
    default: `${site.name} — Construction, Renovation & Extensions`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "builders",
    "home extensions",
    "renovation",
    "house refurbishment",
    "construction company UK",
    "loft conversion",
    "kitchen extension",
  ],
  openGraph: {
    title: `${site.name} — Building Today | Supporting Tomorrow | Standing Forever`,
    description: site.description,
    type: "website",
    locale: "en_GB",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Building Today | Supporting Tomorrow | Standing Forever`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink text-cream">
        <JsonLd />
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <GrainOverlay />
      </body>
    </html>
  );
}
