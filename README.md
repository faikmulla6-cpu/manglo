# Manglo.shop — seller toolkit

A complete replacement for the previous SMM marketplace. No database, login, payment provider or secret environment variables are required.

## Run

Node.js 20+; no npm dependencies.

```sh
npm run build
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

