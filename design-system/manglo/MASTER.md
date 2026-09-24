# MANGLO Design System

Derived with UI/UX Pro Max for a premium creative web-development agency.

## Direction
- Product type: creative web-development agency + live product portfolio.
- Core style: exaggerated minimalism + Aurora UI + restrained liquid-glass accents.
- Pattern: portfolio-first landing page. Show real work before deep service explanation.
- Density: spacious (3/10). Motion: expressive but purposeful (8/10). Variance: bold/asymmetric (8/10).
- Avoid: generic SaaS cards everywhere, decorative motion without meaning, low-contrast glass, fake metrics, stock-template composition.

## Brand tokens
- Ink: #151522
- Muted ink: #6F7282
- Canvas: #FFFFFF
- Soft canvas: #F7F7FF
- Violet: #7047FF
- Violet strong: #5632D5
- Violet soft: #F0EDFF
- Lilac: #A85AE8
- Border: #E6E2F3
- Success: #16775A
- Danger: #B53B45
- Focus ring: rgba(112,71,255,.22)

## Typography
- Display: Space Grotesk, 600-700, tight tracking for headlines.
- Body/UI: Manrope, 400-800.
- Body text must remain >= 16px on long-form/public content; micro-labels may be smaller when non-essential.
- Headline scale: clamp() with dramatic but readable line-height.

## Layout
- Max content width: 1240px.
- Hero and portfolio areas use asymmetric 2-column composition on desktop.
- Section vertical rhythm: 88-120px desktop, 64-76px mobile.
- Use visual grouping rather than excessive borders.

## Components
- Primary CTA: violet gradient, 44px+ hit area, subtle lift only.
- Secondary CTA: white/translucent surface with visible border.
- Cards: 16-24px radius; use shadows selectively on hero/featured work, not every card.
- Forms: visible labels, inline fit/help text, violet focus ring, clear loading/success/error feedback.
- Icons: Lucide only; no emoji icons.

## Motion
- Reveal content only when it enters the viewport.
- Use 150-300ms micro-interactions and 500-800ms hero/portfolio transitions.
- Parallax only on decorative/background layers; never body text.
- Pointer tilt is desktop/fine-pointer only and limited to a few featured surfaces.
- Respect prefers-reduced-motion everywhere.
- Never animate width/height when transform/opacity can do the job.

## Accessibility / UX
- Minimum 44x44px touch targets.
- 4.5:1 text contrast for body copy.
- Visible keyboard focus.
- No hover-only critical actions.
- No content hidden when JavaScript is unavailable.
- Test at 375, 768, 1024, and 1440 widths.

## Performance
- Keep homepage primarily server-rendered.
- Motion controller is client-only and must not own page content.
- Use existing Framer Motion dependency instead of adding another animation runtime.
- Avoid large image payloads until real case-study screenshots are available.
- Reserve geometry for dynamic/animated UI to prevent CLS.
