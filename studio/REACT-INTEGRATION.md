# Manglo Studio React integration

Manglo Studio is the main website at /. The former toolkit and article website is retired from the live build. It uses React, TypeScript, Vite, Tailwind CSS v4, Motion, lucide-react, and shadcn/ui Button and Dialog components.

From the repository root:

    npm ci
    npm run build
    npm start

Open http://localhost:4173/. For frontend development use npm run dev --workspace=manglo-studio while the Node server runs on 4173. The Vite proxy forwards API and studio asset requests to that server.

The reusable hero is components/ui/elias-author-hero.tsx. App.tsx supplies Manglo branding, the new portrait, studio playbooks, and demo-dialog triggers. The supplied original component demo is available with ?demo=elias. StudioContent.tsx contains agency services, real founder products and social links, and illustrative trade concepts. RequestFields.tsx provides the accessible enquiry form.

The server endpoint /api/demo is implemented in the repository's lib/demo-mail.mjs. Follow ../docs/STUDIO-MAIL.md for Hostinger configuration and inbox verification. Credentials stay on the server. Missing configuration produces an honest error while preserving form input.

The root build regenerates dist with the agency homepage, its assets, privacy notice, and illustrative trade concepts. Old /studio/ links redirect to /. Retired article and tool URLs return HTTP 410. The main homepage is indexable with a root canonical and sitemap. Old source and tests remain in Git for reference; CI runs the current site and mail checks.
