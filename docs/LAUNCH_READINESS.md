# Manglo — earlier launch readiness audit (historical baseline)

> **Superseded status note, 8 November 2026:** The draft described below was subsequently merged into `main` at `bb2cfb0cd4225f1833109e679ca0f9ed2f059d63` and Hostinger deployed it. Search Console later confirmed the Journal URL indexed; newer PageSpeed lab scores were mobile 85 and desktop 96 for performance, with accessibility, best practices and SEO scores of 100. The new AdSense-remediation changes are **not described by this older table**. Consult [`ADSENSE_READINESS_20261108.md`](ADSENSE_READINESS_20261108.md) for the current Google-policy crosswalk and release gates. The article publisher, ads and 18:00 IST automation remain inactive.

Audited **8 November 2026**. The improvements are on a **draft GitHub pull request**, not deployed to `manglo.shop`. This document distinguishes source-level evidence from observations on the currently live website. No article, automated schedule, ad code or external notification service was activated.

## Scope and evidence

| Area | Result | Evidence or remaining dependency |
| --- | --- | --- |
| Five editorial desks | **Built, held for content** | Journal index and five mobile-responsive routes: Practical, Shopping, Technology, AI, Trends. Empty desks explicitly show the research phase; they are `noindex` and omitted from sitemap. |
| Original existing guides | **Preserved** | Twelve Playbook articles and all seven tool URLs remain in the build. |
| Editorial identity and disclosure | **Built** | `Manglo Editorial` standards, correction contact, research/AI/image/affiliate disclosures. |
| New article gate | **Dry run ready** | `scripts/editorial-check.mjs` rejects failing claims, source dates, rights, review and SEO fields and explains `SKIP_PUBLICATION`. It requires actual human validation and owner approval even on a pass. |
| Published route SEO | **Local audit passes** | `npm run audit:site` inspects 30 indexable routes for unique titles/descriptions, correct self-canonicals, metadata, schema and navigation. Five unreleased desks remain noindex. |
| Tool/standard schema | **Improved in draft** | All generated pages now receive JSON-LD. Existing Playbook stories retain `BlogPosting` schema. This is a syntax check, not a rich-result guarantee. |
| Lighthouse mobile (live prechange) | **Needs improvement after deploy** | Public PageSpeed Insights lab test: performance **84**, accessibility **95**, best practices **100**, SEO **100**; LCP **3.6 s**, CLS **0.078**. Existing low-contrast kicker and unnecessary Playbook CSS identified; draft fixes both. |
| Lighthouse desktop (live prechange) | **Good, recheck after deploy** | Performance **97**, accessibility **95**, best practices **100**, SEO **100**; LCP **0.8 s**, CLS **0.021**. |
| Core Web Vitals real-user data | **Unverified** | PageSpeed Insights reported no field data. Laboratory scores are not field CWV. |
| Google Search Console | **Access blocker** | The connected Google session had no access to the `manglo.shop` domain property. An owner must provide the correct account/property before inspecting indexing, requesting recrawls or checking sitemaps. |
| Hosting and public launch | **Approval required** | Repository documents Hostinger static upload of `dist/` to `public_html`. Draft changes are not live; deployment requires backup, full build/CI and owner approval. |
| Image usage rights | **Partially documented** | Three illustration assets have generation descriptions; original provenance/rights still need review. `obsidian-hero.webp` has no provenance record and cannot be certified for commercial use from this repository. |
| Image exports | **Full E2E not certified** | Existing browser-local tool implementation and geometry tests remain; representative real-file download tests across browsers/devices are still required. |
| AdSense compliance/approval | **Policy foundation, not approved** | Privacy, About, Contact, Terms, editorial standards and ad independence are present; no Google ads are served. Google controls application, site review, eventual approval and any additional policy requirements. |
| Consent/privacy when ads are enabled | **Not configured** | Assess actual third-party processing, regional notice and consent/CMP requirements before turning on ad scripts. |
| Failure notifications | **Message generated, delivery inactive** | Dry-run JSON contains the skip explanation. Recipient, delivery channel, credentials and end-to-end delivery tests are not configured, by design. |
| Daily 18:00 Asia/Kolkata | **Inactive** | No daily task or publishing automation has been activated. Seven consecutive attended dry runs and explicit approval required before consideration. |

## Predeployment sign-off

1. On the complete GitHub checkout, run `npm ci`, `npm run build`, `npm run typecheck`, `npm test`, `npm run audit:site` and confirm that GitHub CI turns green. The partial local mirror cannot perform the Vite production build because it lacks installed dependencies and pre-existing binary assets.
2. Preview the full built `dist/` on current desktop and narrow mobile widths, including navigation, Playbook search/filter, Journal cards, consent-free privacy pages, all seven tools and actual image file exports.
3. Review and document image origins and rights, especially `obsidian-hero.webp`. Confirm no unlicensed brand/third-party images were introduced.
4. Obtain access to the correct Search Console property; after owner-approved deployment inspect URL coverage, sitemap fetch, canonical selection, recrawl and actual indexing over time.
5. Rerun PageSpeed Insights on public mobile/desktop after deployment; address real remaining bottlenecks and monitor field data when available. No pass can be certified for a change before it reaches the public host.
6. Back up existing Hostinger `public_html`; obtain owner approval and deploy the tested contents of `dist/`, not the source root. Validate live routes, assets, HTTP responses and actual user workflows; keep a rollback copy.
7. Before any AdSense connection, perform a distinct advertising/privacy review for the live implementation, including actual disclosures, consent requirements, placement safety and publisher ownership. Google alone determines approval.
8. For future editorial scheduling, create real evidenced stories and a rights ledger, agree a private failure-notification channel, conduct seven attended dry runs, install a kill switch and only then ask for separate activation approval.

## Related official guidance

- Google Search Central: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google Discover: https://developers.google.com/search/docs/appearance/google-discover
- AdSense privacy guidance: https://support.google.com/adsense/answer/1348695?hl=en
- AdSense ad placement guidance: https://support.google.com/adsense/answer/1346295?hl=en
