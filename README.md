# Manglo.shop — seller toolkit

A complete replacement for the previous SMM marketplace. No database, login, payment provider or secret environment variables are required.

## Run

Node.js 20.19+; install dependencies with `npm install`.

```sh
npm install
npm run build
npm run typecheck
npm test
npm start
```

Open http://127.0.0.1:4173. For static hosting, upload the contents of `dist/` to your web root (Hostinger: `public_html`). Keep route directories intact. Domain and DNS configuration remain with your hosting provider.

## Included

- Browser-local image compression, resizing, format conversion, positioned aspect-ratio cropping and target-size compression.
- Multi-file processing (up to 10 images), previews, downloads, validation and explicit errors.
- Live profit and discount calculators with currency selection and copy results.
- Original seller guides, About, Privacy, Terms and Contact pages.
- Responsive interface, keyboard focus states, sitemap, robots and canonical URLs.

Supported images: JPG, PNG, WebP, up to 20 MB and 40 megapixels each. Requires a modern browser with createImageBitmap and canvas encoding. Animation is flattened. Metadata is not preserved. Inspect exported results.

## Before public launch

Public support contact: faikxbillion@gmail.com. No advertising or analytics tags are installed. Before enabling AdSense, obtain Google approval, update privacy disclosures and add any required consent management. Do not invent publisher IDs or add a fake ads.txt. AdSense approval is not guaranteed.

The old source is recoverable from Git history; this replacement does not delete remote databases or cancel third-party services.

## React hero (Hero 2.1)

The homepage uses a small React island for its animated hero. The rest of Manglo
is still static HTML/CSS/JavaScript: the seven tools, guides, existing navigation,
interactive sample exporter and all URLs remain unchanged. If the hero bundle
cannot load, the original server-rendered hero remains usable.

- Component: `components/ui/hero-2-1.tsx` (`Hero2`); example usage in `components/demo.tsx` (`DemoOne`).
- Mount: `src/hero-entry.tsx` replaces only the homepage `.hero-copy` contents.
- Styles: `src/hero.css`, Tailwind CSS v4, generated as `dist/hero-2-1.css`.
- Bundler: `vite.config.ts`, generated as `dist/hero-2-1.js`.
- Dependencies: `react`, `react-dom`, `motion`, `lucide-react` plus TypeScript/Vite/Tailwind dev tools.
- No extra React context provider or shared application state is needed. The hero
  only holds the local "How does Manglo work?" disclosure state.

Run `npm run build` after edits and deploy the entire `dist/` directory. The
static build adds the CSS/JS tags to the homepage only; the React bundle runs
after the existing `app.js` renderer. `npm run typecheck` checks the TSX.

The root-level `components/ui` is deliberately the shadcn component directory,
with the `@/components/ui` alias in `tsconfig.json` and `vite.config.ts`, plus
`components.json` for shadcn compatibility. Keep this folder so generated UI
components and imports have one predictable location. To add shadcn components,
run `npx shadcn@latest add <component-name>` from the project root. If creating
a new project instead, run `npx shadcn@latest init` in a React/TypeScript app
with Tailwind installed. Here, the Tailwind CSS import omits Preflight and uses
the `mg:` prefix to avoid overriding the existing static toolkit styles.

The page reuses Manglo's existing local product photo rather than introducing
an external image request; no new privacy disclosure or remote asset is needed.

