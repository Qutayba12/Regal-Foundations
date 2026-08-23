import { site } from "@/lib/site";

/** LocalBusiness structured data — helps Regal appear in local Google results. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    areaServed: site.contact.serviceArea,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.address,
      addressCountry: "GB",
    },
    url: "https://regalfoundations.co.uk",
    priceRange: "££",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
