# Regal Foundations — Website

Premium marketing website for **Regal Foundations**, a UK construction, renovation
and extensions company.

> **Building Today · Supporting Tomorrow · Standing Forever**

## ✨ Highlights

- **Dark, luxury design** built around the Regal brand (charcoal black, regal gold, metallic silver).
- **Real 3D hero** — a metallic “R” crowned in gold, rotating live in the browser (Three.js / React Three Fiber). No external models or assets required.
- **Multi-page** structure: Home · Services · Projects · About · Contact.
- **Interactive before/after slider** and a filterable project gallery.
- **Lead-focused**: free-quote form, floating WhatsApp & call buttons.
- **Fast & SEO-ready**: Next.js App Router, metadata, sitemap, robots and LocalBusiness structured data.
- **Fully responsive** and respects reduced-motion preferences.

## 🛠 Tech stack

| Area | Choice |
|------|--------|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| 3D | [three](https://threejs.org) · [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) · [drei](https://github.com/pmndrs/drei) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Hosting | [Vercel](https://vercel.com) |

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## ✏️ Editing content

**All editable content lives in one file:** [`src/lib/site.ts`](src/lib/site.ts).

Update these placeholders with the real details — the whole site updates automatically:

- `site.contact` — phone, WhatsApp number, email, address, service area, hours.
- `services` — the services offered and their descriptions.
- `projects` — project cards (swap the gradient placeholders for real photo URLs in `before` / `after`).
- `testimonials`, `stats`, `faqs` — social proof and copy.

### Swapping gradient placeholders for real photos

In `projects`, replace a gradient string like
`"linear-gradient(135deg,#C9A24B,#5a4a24)"` with an image URL
(`"/projects/kitchen-after.jpg"` or a full `https://…` URL). The gallery and
before/after slider detect URLs automatically.

## 📬 Connecting the quote form

The quote form in [`src/components/QuoteForm.tsx`](src/components/QuoteForm.tsx)
currently shows a success state without sending. To make it send real enquiries,
add a form backend (recommended: **Web3Forms** or **Formspree** — no server
needed) at the marked `TODO` in that file.

## 🌐 Deploying to Vercel

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Deploy — no configuration required.
4. Add the custom domain (e.g. `regalfoundations.co.uk`) in the Vercel dashboard.

---

© Regal Foundations. All rights reserved.
