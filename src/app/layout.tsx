import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import JsonLd from "@/components/JsonLd";
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
  metadataBase: new URL("https://regalfoundations.co.uk"),
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
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
