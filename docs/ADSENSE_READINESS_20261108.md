# Manglo — Google AdSense readiness review

Audit date: **8 November 2026**. Target site: `https://manglo.shop`. Owner goal: strong first-pass readiness; **Google review timing and approval are outside our control**. Google's own guidance says most site reviews take several days and may take **2–4 weeks**, so **24-hour approval cannot be promised**: https://support.google.com/adsense/answer/12176698.

This document evaluates the proposed remediation against the live baseline. It is not an AdSense approval, a declaration that all external policy checks have been completed, or permission to activate ads. The user will submit the application manually. Article publishing, AdSense tags, ad serving, the 18:00 Asia/Kolkata schedule and automated notifications remain **inactive**.

## Current AdSense review crosswalk

| Google concern | Verified evidence / proposed fix | Status before a manual application |
| --- | --- | --- |
| Accessible live site | `manglo.shop` and `/journal/` publicly served; Search Console inspection showed the Journal indexed and on HTTPS. Crawlability, redirects, robots and domain ownership should be checked again after deployment. | Baseline observed; postdeploy recheck required |
| Unique valuable content | 12 original Playbook walkthroughs, example calculations and working browser tools remain. Every tool URL now has distinct plain-language guidance before and after JavaScript. | Source remediation complete; live after deployment |
| Fully built navigation | Five Journal categories previously displayed *Research and review phase* with almost no reader value. Rewritten existing category landing pages now contain concrete decision methods and checklists, not fictitious news. They stay `noindex,follow` and outside the sitemap until substantial category articles are separately authorized. | Source remediation complete; verify visually live |
| Originality and copyright | Four new unbranded AI-assisted illustrative WebP assets created and recorded on 8 Nov; all active page and app references switch to them. Older unverified assets are not reused. | Provenance observed; final owner visual/trademark review still necessary |
| Reader trust | About, Contact, Privacy, Terms and Editorial Standards are available; the author is the organizational **Manglo Editorial**, not a fabricated expert. Current ad-free state and independent editorial gate are disclosed. | Source confirmed; live verify after release |
| Privacy and advertising disclosure | Privacy page updated in proposed build to describe current no-ads status plus the conditional future Google ad-cookie model and user controls. It does not imply tags or cookies are active now. | Prepared; must be revisited for actual vendors and regional laws before serving ads |
| Illegal or restricted material | No obvious prohibited topics were seen in audited first-party content. An article-by-article content and rights review is still required if publication changes. | No confirmed issue; not a blanket policy clearance |
| Ad code / ads.txt | No publisher ID, Google ad script, ads.txt placeholder or ad placements added. An actual publisher ID and verification method must come from the owner's AdSense account. ads.txt is strongly recommended, not universally mandatory. | Correctly inactive until account setup |
| Consent (EEA/UK/Switzerland) | No Google ads are served now. Before activating applicable ad traffic, configure a Google-certified TCF CMP and test the actual consent experience. | Future advertising blocker; not needed for an ad-free website |
| Ad layout and invalid traffic | Do not place ads next to download/tool controls or pressure users to click. No ads currently run; no invalid-click metrics exist. | Evaluate when actual units are configured |
| Mobile and desktop experience | Prior postdeploy lab scores: mobile Performance 85 / Accessibility 100 / Best Practices 100 / SEO 100; desktop 96 / 100 / 100 / 100. Mobile LCP ~3.6s needs continued optimization. Browser width/layout and tool controls require a repeat check after these changes. | Positive baseline; real-user CWV unverified |
| Search Console and sitemap | Journal URL indexing was confirmed; sitemap resubmission previously observed. New category landing pages remain noindex and sitemap continues to list 30 indexable routes, avoiding artificial index bloat. | Google controls recrawl; verify coverage after release |

## What Google actually emphasizes

1. **Original, useful and substantial publisher content**, not copied/scraped filler: https://support.google.com/adsense/answer/7299563.
2. **Functional, clear navigation** and a finished website; under-construction and insufficient-content pages are common rejection reasons: https://support.google.com/adsense/answer/81904.
3. **Accessible website and correct ownership connection**. Google checks ads-code/verification, SSL, public reachability and crawler access: https://support.google.com/adsense/answer/12176698.
4. **Publisher policy compliance**. Google ads cannot run on screens without meaningful publisher content, such as empty, under-construction or navigation-only pages: https://support.google.com/publisherpolicies/answer/11112688.
5. **Copyright compliance**. Images and third-party creative works need rights: https://support.google.com/adsense/answer/7299563.
6. **Privacy disclosures**. Google documents cookie/vendor notices for publishers once advertising is in use: https://support.google.com/adsense/answer/1348695.
7. **Advertising consent**. When serving ads to users in the EEA/UK/Switzerland, check Google's certified-CMP requirement: https://support.google.com/adsense/answer/13554116.
8. **No misleading placements, invalid clicks or click encouragement**: https://support.google.com/adsense/answer/1346295 and https://support.google.com/adsense/answer/48182.
9. **ads.txt** is recommended, using the real AdSense publisher ID once available: https://support.google.com/adsense/answer/12171612.

Google does not publish a universal minimum number of blog posts, minimum traffic level or promise of approval in 24 hours. More pages or more AI-generated content do not automatically improve approval likelihood.

## Release gates and unfinished external work

Before calling the website ready for the owner's manual application:

- [ ] Merge/deploy the tested remediation branch with the owner's release approval; this document alone is not proof the live domain was updated.
- [ ] GitHub CI green for `npm ci`, full build, typecheck, tests, site audit; preserve seven tool routes and twelve existing articles.
- [ ] Check production desktop, 390px mobile and keyboard navigation, including each Journal category and each tool with JavaScript enabled.
- [ ] Check live 200/404 behavior, canonical URLs, sitemap, robots, image loading and no accidental AdSense tags or auto-publishing.
- [ ] Run PageSpeed Insights and inspect mobile LCP after deployment; Core Web Vitals field data may be unavailable for low-traffic URLs and cannot be fabricated.
- [ ] Owner visually signs off the four generated illustrations for unintended third-party resemblance and intended use; keep the provenance ledger.
- [ ] Confirm the correct legal/account owner is eligible, the site belongs to them and all required AdSense account details are accurate. The account/site review is Google's decision.
- [ ] When choosing to connect AdSense, use real verification information from the owner's account, and set any required `ads.txt` after obtaining the real publisher ID. Do not turn ad serving on without separate authorization.
- [ ] Before actual ad serving, update the policy for real vendors, install/test regional CMP as applicable, check placements and policy center, and never put ads next to download buttons.

**No activation permitted in this revision:** article publications, automatic 6 PM runs, public ad units, AdSense application submission or notification delivery. Article review and publishing are separate from modifying the existing website category and tool-explanation pages.
