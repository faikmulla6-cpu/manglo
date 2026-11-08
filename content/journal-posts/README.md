# Journal article packages — fail-closed source of truth

Manglo's static build discovers `*.json` files in this directory. **Do not add a JSON file unless its content, citations, actual image file, rights evidence, and human review have all been verified.** The build aborts for failed checks; it never publishes a partially checked article.

The ChatGPT daily editorial automation is scheduled for 18:00 Asia/Kolkata. The owner authorised conditional automatic publication on 9 November 2026. Publication is still **blocked** until the seven recorded real dry runs, independent/editorial review and all technical gates in `docs/EDITORIAL_OPERATIONS.md` are satisfied. AdSense Auto ads remain disabled.

## Package contract

Each file is named `<slug>.json` (for example, `how-to-check-an-ai-image.json`) and has:

- `status`: exactly `review` (unpublished, reviewed package).
- `author`: exactly `Manglo Editorial`.
- `category`: one of `practical`, `shopping`, `technology`, `ai`, `trends`.
- `slug`, `title`, `summary`, `publishedAt`: the date is `YYYY-MM-DD` and must not be future-dated.
- `blocks`: at least five plain-text blocks with at least two `heading` blocks, `paragraph` blocks and optional `list` blocks (`items` array). No HTML, scripts or embedded widgets. The combined body must be substantive, 400+ words minimum, with actual original value; word count alone is not a quality guarantee.
- `sources`: at least two distinct reviewed sources, with `{id,title,publisher,url,checkedAt}` using HTTPS links and checked dates. A second link to the same publisher does not count as independent corroboration for disputed claims.
- `claims`: the audited claim ledger, as `{text,verified:true,sourceIds:[...]}`. Never set `verified:true` without actually checking the source and the assertion.
- `image`: `{rightsType:"original"|"licensed",rightsEvidence,path,alt,width,height,caption}`. Use a real, original/licensed **16:9 image at least 1200 px wide**, preferably **1600 × 900**. The path must be `/assets/journal/<slug>.webp` (or `.png`/`.jpg`), and the actual binary must exist under `dist/assets/journal/`. The build independently checks dimensions and bytes.
- `seo`: `{description,canonical}` with a unique useful description and canonical `/journal/<slug>/`.
- `originalValue`, `aiDisclosure`: honest statements of what this adds and how AI assisted.
- `commercialDisclosure`: required for shopping desk articles, even when it says there is no affiliate arrangement.
- `review`: accurate review flags `accuracy`, `originality`, `rights`, `readerValue`, `risk`, `advertising`, `accessibility`, `technical`; `humanSpecialist` is additionally required for trends/high-risk topics. **Never fabricate or self-certify human review.** Preserve real signoff evidence in the editorial record.

Only approved categories with substantive articles become indexable; verified article URLs are emitted into `/sitemap.xml` and `/feed.xml`, with canonical, Open Graph and `BlogPosting` JSON-LD. Live pages expose sources and disclosures to readers.

## Publication procedure

1. Research and write a useful original piece; keep the independent claims/sources ledger.
2. Create the thumbnail and record its rights in `docs/IMAGE_RIGHTS_REGISTER.md`.
3. Run `node scripts/editorial-check.mjs --input <draft-with-body.json> --output <report.json>`; this is **dry-run only** and doesn't confer publish permission. The site compiler derives `body` from `blocks` before rechecking the gates.
4. Do not merge the article until the additional editorial release checks are satisfied: real sign-offs, source freshness, seven logged dry-run validations, daily quota, complete SEO, thumbnail and tests.
5. Run `npm run build`, `npm test`, `npm run typecheck`, `npm run audit:site` and `npm run audit:links` on an installed checkout. If any fails, skip.
6. Hostinger automatically deploys verified commits from GitHub `main`. Confirm the resulting `https://manglo.shop/journal/<slug>/` loads with the correct article, image, sources, schema and canonical before notifying success. A merged PR alone is not confirmation.
7. On failure, notify Faik with the specific gate, evidence and corrective next step. No article or ad settings are changed on a failed run.

The JSON format is exercised in `tests/journal-posts.test.mjs`. That test uses synthetic claims and image files solely in a temporary directory; **it is not an article suitable for publication**.
