# Manglo Studio

Manglo Studio is the main website at https://manglo.shop/. React, TypeScript, Vite, Tailwind, Motion, and shadcn/ui power the frontend. A private Node endpoint sends demo requests through Hostinger Mail to faik@manglo.shop.

## Develop and check

    npm ci
    npm run build
    npm run typecheck
    npm test
    npm run audit:site
    npm run audit:links
    npm start

Open http://localhost:4173/. For frontend development use npm run dev --workspace=manglo-studio with the Node server running on 4173.

## Deploy

Hostinger auto-deploys main from faikmulla6-cpu/manglo. Use the Express preset, Node 22, root ./, and entry scripts/serve.mjs. This preset starts the Node entry without running a build command, so generated dist assets are committed with source. Build and check before pushing. Existing Hostinger environment variables stay in place. See docs/STUDIO-MAIL.md for server secrets and mail verification. Never commit credentials.

## Main-site replacement

The production build clears dist and emits only the agency homepage, assets, privacy notice, design concepts, sitemap, robots and error page. Old /studio/ URLs permanently redirect to /. The previous Journal, Playbook, guides, and tools return HTTP 410 and are absent from the deployed files. Former contact, about, and privacy links point to the relevant studio section or privacy notice.

Legacy content, build scripts, components and tests remain in Git for historical reference. They are not part of the current production build or CI test selection. Do not run the retired editorial builder to publish articles. The active tests cover studio routing, redirects, metadata, assets, removed pages, and demo mail delivery behavior.
