# Manglo Journal — editorial operations and release safeguards

**Retired 27 November 2026:** The owner replaced the public article/toolkit website with Manglo Studio at the domain root. Do not publish Journal, Playbook, or guide pages to manglo.shop. The active build excludes them, the legacy editorial builder is disabled, and the server returns HTTP 410 for retired routes. The policies below are historical and do not authorize new public article releases.

Status as of **9 November 2026**: Faik explicitly authorised a **daily 18:00 Asia/Kolkata editorial automation**, including conditional publication of at most one fully qualified article per day. The automation is enabled. Individual article publication still fails closed until every required check, real review/sign-off, thumbnail asset, source ledger and live-deployment verification is complete. Google AdSense Auto ads, advertising code and ad serving remain **disabled**.

## Locked choices

- Byline: **Manglo Editorial**, an organizational identity. Never invent a person, photo, review credentials or firsthand use.
- Audience: India-first English; explanations useful internationally with regional qualifiers.
- Five desks: Practical guides, Shopping smarter, Technology, AI in practice, Verified trends.
- Scheduled editorial run: 18:00 **Asia/Kolkata** daily, at most one qualified article. A run is not a publication quota.
- Every failed gate: **SKIP PUBLICATION** and create an explanation; never force a weaker replacement story.
- Owner's blanket **conditional** publishing approval was provided on 9 November 2026. It replaces per-article owner publication approval **only after all safety gates pass**; it does not waive independent review, specialist sign-offs, deployment checks, or future approval for enabling advertising.

## Working states

`IDEA -> RESEARCH -> DRAFT -> FACT_CHECK -> RIGHTS_CHECK -> HUMAN_REVIEW -> PREVIEW -> RELEASE_CHECK -> [approved automatic publication] -> LIVE_VERIFICATION`

Any failed stage routes to `SKIPPED` with a title, timestamp, failed gates, sources, corrective action and a clear statement that nothing went live. The existing checker says `READY_FOR_OWNER_REVIEW` on a pass because it is a dry-run preflight; **this alone is never permission to publish**. Actual release requires the additional operational, reviewer and deployment gates.

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
7. Before the **first unattended live article**, complete **seven consecutive real dry-run validations**, logging all pass/fail states and checking delivery of skipped-publication explanations to Faik. The editorial schedule is active but must skip release while this evidence is missing; simulated unit tests are not a substitute.
8. Blanket conditional owner authorisation for the 6 PM automation was given on 9 November 2026. Maintain a working kill switch and reversible rollback process. **Never** enable Auto ads under this approval.
9. Hostinger dashboard confirmed that `main` of `faikmulla6-cpu/manglo` deploys automatically. Do not infer success from a GitHub merge or Hostinger deployment status alone: check the final article URL, image, metadata and content live.
10. New Journal article packages live in `content/journal-posts/*.json`; see that folder's README for the strict content and thumbnail contract. The build refuses invalid or incomplete packages.

## External dependencies that cannot be certified in source code

- Google Search Console domain verification, URL Inspection results, actual indexing, recrawl and Core Web Vitals field data.
- Google AdSense account/site review and Google-controlled approval. **No one can guarantee acceptance**.
- Regional CMP configuration and actual ad placement behavior when AdSense is connected, if required by applicable policy/law.
- Notification delivery must be verified by an actual scheduled run; the local editorial checker only creates a report message and sends nothing.
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
