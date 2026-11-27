# Responsive and interaction QA — 27 November 2026

Checked the live Manglo Studio site, then the corrected production build in a Chromium browser using responsive viewports at 320×740, 390×844, 768×1024, 1024×768, 1440×900, and 1920×1080. This is browser viewport testing, not a claim of testing physical iOS/Android devices.

## Corrections

- Mobile header has a visible Book a demo label alongside the logo, with no overlap at the smallest checked width.
- Navigation and secondary action buttons have larger touch targets.
- The demo form's 44px close button stays reachable while its contents scroll.
- Closing the dialog returns keyboard focus to the action that opened it.
- Navigation highlights the selected hash section. Direct booking links open the form and remove the booking hash when closed.
- Long chapter headings fit within the decorative playbook pages.

## Browser checks

- No horizontal page overflow or heading clipping across the six viewport sizes.
- Header, secondary and closing-section demo actions open the dialog. Close and Escape work; focus returns to the opener.
- Blank required fields and invalid email addresses prevent submission.
- Missing local mail credentials produce an honest error and preserve form values.
- Privacy and concept-page links return to the homepage demo form.
- All five FAQ questions expand to show their answers.
- Motion pause/resume and interactive playbook controls respond.
- Homepage logos and portrait load. Concept pages and privacy notice fit at 320px.
- ClipKaro, Zyvello, Instagram, and YouTube destination URLs respond successfully.

## Release checks

Build, TypeScript checks, 11 server/mail tests, metadata audit, and internal-link audit pass. The production release also requires CI success and a labelled demo submission verified in the Hostinger inbox; those are checked after pushing the corresponding commit.
