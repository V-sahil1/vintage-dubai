# Vantage Motors – Showroom Website

Next.js (App Router) + Tailwind CSS 4 build of the Stitch "Obsidian & Gilt Precision" designs in this folder.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

- Design tokens (colors, type scale, spacing) live in `app/globals.css` (`@theme`).
- Vehicle data, filters and categories: `lib/vehicles.ts`. Contact details and nav: `lib/site.ts`.
- Images are in `public/images` (downloaded from the design exports; hero, featured Porsche and lounge use the local high-res PNGs).
- Forms show an on-page confirmation only; they are not wired to a backend.
