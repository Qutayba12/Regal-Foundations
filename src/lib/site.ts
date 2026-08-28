/**
 * Regal Foundations — central content configuration.
 *
 * Everything a non-developer might want to change lives here:
 * contact details, services, projects, testimonials, stats.
 * Replace the PLACEHOLDER values below with the real ones and the whole
 * site updates automatically — no need to touch the design or components.
 */

export const site = {
  name: "Regal Foundations",
  shortName: "Regal",
  tagline: "Building Today · Supporting Tomorrow · Standing Forever",
  description:
    "Regal Foundations is a premium construction, renovation and extension company based in the UK. From home extensions to full refurbishments and bespoke interior finishes, we build with craftsmanship that stands forever.",
  // ---- CONTACT (PLACEHOLDER — replace with the real details) ----
  contact: {
    phoneDisplay: "+44 20 0000 0000",
    phoneHref: "+442000000000",
    whatsappNumber: "442000000000", // international format, no + or spaces
    email: "hello@regalfoundations.co.uk",
    address: "Sheffield, United Kingdom",
    serviceArea: "the United Kingdom",
    hours: "Mon–Sat · 8:00am – 6:00pm",
  },
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  icon: "extension" | "renovation" | "decor";
};

export const services: Service[] = [
  {
    slug: "extensions",
    title: "Extensions",
    short: "Add space, light and value to your home.",
    description:
      "Single and double-storey rear and side extensions, kitchen extensions and wrap-arounds. We handle everything from planning and structural design to the final brick — creating light-filled space that feels like it was always part of your home.",
    features: [
      "Single & double-storey extensions",
      "Rear, side & wrap-around builds",
      "Planning & building-regs support",
      "Structural steelwork & foundations",
    ],
    icon: "extension",
  },
  {
    slug: "renovations",
    title: "Full Renovation & Restoration",
    short: "Complete home transformations, done right.",
    description:
      "Whole-house renovations and period restorations that respect the character of your property while bringing it fully up to modern standards. Kitchens, bathrooms, structural repairs and everything in between — one trusted team, one seamless project.",
    features: [
      "Full-house refurbishments",
      "Period property restoration",
      "Kitchens & bathrooms",
      "Structural & damp repairs",
    ],
    icon: "renovation",
  },
  {
    slug: "decor",
    title: "Décor & Interior Finishes",
    short: "The finishing touches that make it regal.",
    description:
      "Bespoke interior finishing — plastering, joinery, flooring, tiling, painting and decorative detailing. The craft-level finishes that turn a good build into a home you are proud to show off.",
    features: [
      "Premium plastering & painting",
      "Bespoke joinery & carpentry",
      "Flooring & tiling",
      "Decorative & feature detailing",
    ],
    icon: "decor",
  },
];

export const stats = [
  { value: 15, suffix: "+", label: "Years of combined experience" },
  { value: 200, suffix: "+", label: "Projects completed" },
  { value: 100, suffix: "%", label: "Fully insured & guaranteed" },
  { value: 5, suffix: "★", label: "Average client rating" },
];

export const process = [
  {
    step: "01",
    title: "Consultation",
    text: "We visit, listen to your vision and understand your budget and timeline.",
  },
  {
    step: "02",
    title: "Design & Quote",
    text: "A clear, detailed proposal with transparent pricing — no hidden surprises.",
  },
  {
    step: "03",
    title: "Build",
    text: "Our skilled team delivers with quality craftsmanship and daily site care.",
  },
  {
    step: "04",
    title: "Handover",
    text: "A spotless finish, a full walk-through, and a workmanship guarantee.",
  },
];

export const whyUs = [
  {
    title: "Built to Last",
    text: "Foundations-first engineering. We build for permanence, not just for show.",
  },
  {
    title: "Fully Insured",
    text: "Comprehensive insurance and building-regulation compliance on every project.",
  },
  {
    title: "One Trusted Team",
    text: "No subcontractor chaos. One accountable team from first brick to final finish.",
  },
  {
    title: "Transparent Pricing",
    text: "Detailed, honest quotes. You always know exactly what you are paying for.",
  },
];

export type Project = {
  title: string;
  category: "Extensions" | "Renovation" | "Décor";
  location: string;
  // Gradient placeholders — swap for real photo URLs later (before / after).
  before: string;
  after: string;
};

export const projects: Project[] = [
  {
    title: "Victorian Rear Extension",
    category: "Extensions",
    location: "Nether Edge, Sheffield",
    before: "linear-gradient(135deg,#3a3d44,#20222a)",
    after: "linear-gradient(135deg,#C9A24B,#5a4a24)",
  },
  {
    title: "Full House Refurbishment",
    category: "Renovation",
    location: "Fulwood, Sheffield",
    before: "linear-gradient(135deg,#33363d,#1c1e25)",
    after: "linear-gradient(135deg,#7d8794,#2f333b)",
  },
  {
    title: "Bespoke Kitchen & Diner",
    category: "Décor",
    location: "Ecclesall, Sheffield",
    before: "linear-gradient(135deg,#3d3a35,#232019)",
    after: "linear-gradient(135deg,#E4C77E,#8a6b2e)",
  },
  {
    title: "Loft & Master Suite",
    category: "Extensions",
    location: "Dore, Sheffield",
    before: "linear-gradient(135deg,#34373e,#1e2027)",
    after: "linear-gradient(135deg,#9aa3ad,#3a3f47)",
  },
  {
    title: "Period Property Restoration",
    category: "Renovation",
    location: "Ranmoor, Sheffield",
    before: "linear-gradient(135deg,#3a3630,#221f18)",
    after: "linear-gradient(135deg,#C9A24B,#4f4020)",
  },
  {
    title: "Luxury Bathroom Suite",
    category: "Décor",
    location: "Whirlow, Sheffield",
    before: "linear-gradient(135deg,#333640,#1d1f26)",
    after: "linear-gradient(135deg,#cfd4da,#43474f)",
  },
];

export const testimonials = [
  {
    quote:
      "Regal Foundations transformed our tired terrace into a home we never want to leave. Meticulous, tidy and genuinely proud of their work.",
    name: "Sarah & James M.",
    location: "Nether Edge",
  },
  {
    quote:
      "The most professional builders we have ever worked with. Clear pricing, on schedule, and the finish is flawless.",
    name: "Daniel O.",
    location: "Fulwood",
  },
  {
    quote:
      "From the first consultation to the final handover, everything felt in safe hands. Our extension is stunning.",
    name: "Priya K.",
    location: "Ecclesall",
  },
  {
    quote:
      "Our double-storey extension doubled our living space and the finish is immaculate. They treated our home like their own.",
    name: "Michael & Claire T.",
    location: "Dore",
  },
  {
    quote:
      "A full renovation of a period property is daunting, but Regal made it effortless. Honest, tidy and always on time.",
    name: "Rebecca H.",
    location: "Ranmoor",
  },
  {
    quote:
      "The new kitchen and diner is the heart of our home now. Faultless craftsmanship and clear communication throughout.",
    name: "Andrew P.",
    location: "Whirlow",
  },
  {
    quote:
      "They restored our Victorian features beautifully while bringing everything up to modern standards. Couldn't be happier.",
    name: "Sophie & Tom L.",
    location: "Millhouses",
  },
  {
    quote:
      "From quote to completion there were no nasty surprises. The team were polite, respectful and genuinely skilled.",
    name: "Hannah B.",
    location: "Crosspool",
  },
  {
    quote:
      "Our loft conversion added a stunning master suite. Professional from day one — I recommend them to everyone.",
    name: "James W.",
    location: "Bents Green",
  },
  {
    quote:
      "Superb attention to detail on our bathroom suite. It feels like a luxury hotel now, and it came in on budget.",
    name: "Olivia R.",
    location: "Totley",
  },
];

export const serviceAreas = {
  hub: "Sheffield",
  intro:
    "Based in Sheffield, we build across the city's suburbs and out into the wider South Yorkshire and Derbyshire region — right up to the edge of the Peak District.",
  // Editable list of the areas we cover (used by the coverage section).
  areas: [
    "Nether Edge",
    "Ecclesall",
    "Fulwood",
    "Dore",
    "Ranmoor",
    "Totley",
    "Whirlow",
    "Millhouses",
    "Crosspool",
    "Bents Green",
    "Broomhill",
    "Hillsborough",
    "Walkley",
    "Woodseats",
    "Bradway",
    "Stannington",
    "Dronfield",
    "Rotherham",
    "Chesterfield",
    "Hathersage",
  ],
} as const;

export const faqs = [
  {
    q: "Do you handle planning permission and building regulations?",
    a: "Yes. We guide you through the entire process and work with trusted architects and structural engineers so your project is fully compliant.",
  },
  {
    q: "Are you insured?",
    a: "Absolutely. Every project is fully insured and carries a workmanship guarantee for your complete peace of mind.",
  },
  {
    q: "How long does a typical extension take?",
    a: "Most single-storey extensions take 8–14 weeks depending on size and specification. We give you a clear timeline in your written quote.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes — we offer a free, no-obligation consultation and detailed written quote for every enquiry.",
  },
];
