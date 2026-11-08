# Manglo Journal — editorial operations (inactive)

Status: **preparation only**. No automated publishing, no ad code and no notification service is enabled.

## Locked choices

- Byline: **Manglo Editorial**, an organizational identity. Never invent a person, photo, review credentials or firsthand use.
- Audience: India-first English; explanations useful internationally with regional qualifiers.
- Five desks: Practical guides, Shopping smarter, Technology, AI in practice, Verified trends.
- Proposed future run: 18:00 **Asia/Kolkata** daily, at most one qualified article. The schedule remains **inactive**.
- Every failed gate: **SKIP PUBLICATION** and create an explanation; never force a weaker replacement story.
- Separate owner approval required before any automated publishing, new article publication, ad insertion or deployment to manglo.shop.

## Working states

`IDEA -> RESEARCH -> DRAFT -> FACT_CHECK -> RIGHTS_CHECK -> HUMAN_REVIEW -> PREVIEW -> OWNER_REVIEW -> [explicitly authorized publication]`

Any failed stage routes to `SKIPPED` with a title, timestamp, failed gates, sources, corrective action and a clear statement that nothing went live. `READY_FOR_OWNER_REVIEW` is **not** permission to publish.

## Quality gate

Use `node scripts/editorial-check.mjs --input path/to/draft.json --output path/to/report.json`. It produces a local dry-run report only and exits nonzero on failure. This is a **defensive preflight**, not a replacement for human fact-checking. The JSON schema is demonstrated in `tests/editorial.test.mjs`.

Checks include: organizational author, approved category, substantive answer, distinct source log, verified consequential claims, image rights/evidence and alt text, canonical/description, original value, AI disclosure, independent reviewer sign-offs, affiliate disclosure for shopping, specialist review for trends/high stakes, and source freshness for trends.

## Publication readiness

1. Every new article must have an individual sources/claims ledger (with checked dates) and a documented human review.
2. Do not market a synthesized comparison as hands-on testing. Label research, illustrative scenarios and affiliate relationships transparently.
3. Article imagery must be original or properly licensed, relevant and not create a false impression. Maintain `docs/IMAGE_RIGHTS_REGISTER.md`.
4. Publish revised content only when the precise update is verified. Date changes should reflect real changes.
5. No category page is indexed before that category has substantive independently verified articles; empty Journal desks currently use `noindex,follow` and are absent from the sitemap.
6. Verify previews on desktop/mobile, canonical URLs, `Article` markup, image metadata, sitemap, RSS and link integrity.
   The static build now includes `npm run audit:site` to inspect indexable URLs,
   descriptions, canonical/OG URLs, structured data, accessible navigation and
   unindexed empty categories. This does not replace browser or live audits.
7. Run **seven consecutive real dry runs**, logging all pass/fail states and verifying delivery of skipped-publication explanations to Faik, before considering activation. Simulated unit tests are not a substitute.
8. Obtain explicit approval for publishing and for enabling the separate 6 PM automation. Maintain a working kill switch and reversible rollback process.

## External dependencies that cannot be certified in source code

- Google Search Console domain verification, URL Inspection results, actual indexing, recrawl and Core Web Vitals field data.
- Google AdSense account/site review and Google-controlled approval. **No one can guarantee acceptance**.
- Regional CMP configuration and actual ad placement behavior when AdSense is connected, if required by applicable policy/law.
- Delivery destination and credentials for editorial failure notifications. The current dry run creates a report message but deliberately sends nothing.
- Publisher ownership and rights records for any image without provenance evidence.

For measured predeployment status and owner-controlled release gates, see
`docs/LAUNCH_READINESS.md`.

## Official references consulted 8 November 2026

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/appearance/google-discover
- https://support.google.com/adsense/answer/1348695?hl=en
- https://support.google.com/adsense/answer/1346295?hl=en
