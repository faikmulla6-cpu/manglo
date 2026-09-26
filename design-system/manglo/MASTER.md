# MANGLO Design System

## Core direction
MANGLO should feel like a serious digital product studio, not a generic agency template.

The visual system combines:
- Suno: confidence and simplicity
- Mantality: storytelling and section rhythm
- SalesHookAI: technical/product proof
- Qronos: restraint and enterprise maturity
- Folio: editorial luxury and oversized product presentation
- shadcn/ui + shadcn-studio: component discipline and semantic token architecture

## Visual modes
1. Editorial white
   - business story
   - services
   - process
   - project brief
   - calm, spacious, typographic

2. Engineering black
   - product proof
   - architecture
   - admin/backend/operations
   - large UI screenshots and system diagrams

3. Signature violet
   - CTAs
   - focus/ring
   - motion accents
   - section highlights
   - never used everywhere at once

## Brand tokens
- Ink: #111218
- Ink elevated: #171820
- Canvas: #FFFFFF
- Soft canvas: #F7F7FB
- Violet: #7047FF
- Violet strong: #5933DA
- Violet soft: #F0EDFF
- Lilac: #A85AE8
- Border: #E7E5EE
- Body text: #6F7382
- Success: #16775A
- Danger: #B53B45
- Focus ring: rgba(112,71,255,.22)

## Typography
- Display: Space Grotesk
- Body/UI: Manrope
- Large headlines should carry the art direction.
- Body copy must stay readable; premium does not mean tiny text.
- Use an editorial serif only in rare future storytelling moments, never in product UI.

## Layout
- Max content width: 1240px
- Section rhythm: 96–122px desktop, 68–82px mobile
- One dominant idea per section
- Large product proof should occupy 50–80% of the visual field
- Prefer thin borders, type, whitespace and screenshot scale over generic card grids
- Use asymmetric layouts deliberately

## Component architecture
Base primitives should be semantic and reusable:
- Button
- Badge
- Input / Textarea / Select
- Field
- Tabs
- Dialog / Sheet
- Tooltip
- Accordion
- Table
- Skeleton
- Separator

MANGLO compositions sit above primitives:
- Section
- Container
- Eyebrow
- DisplayHeading
- ProductBrowser
- CaseStudy
- ArchitectureMap
- ServiceRow
- Metric
- Pricing/EngagementCard
- ProjectBrief

## Motion
- Native browser primitives first
- IntersectionObserver for reveal
- requestAnimationFrame for scroll/pointer work
- transform/opacity only for major motion
- 150–300ms micro-interactions
- 500–800ms section/product transitions
- Pointer tilt only on fine pointers
- Magnetic CTAs only where they add delight
- Reduced-motion users get the complete experience without animation
- Motion must never be required to reveal critical content

## UX rules
- Minimum 44px touch target
- Visible keyboard focus
- Body text 16px-ish on public content
- No hover-only critical behavior
- No fake metrics or fake client logos
- No stock-template composition
- No “card for every sentence”
- No dark cyberpunk overload
- No violet gradient on every section

## Product proof rules
- Show real products before deep service explanation
- ClipKaro AI is public proof and should link directly
- MANGLO Growth Marketplace and Operations can demonstrate system depth
- Technical sections should visibly show frontend, APIs, auth, data, admin and launch layers
- A visitor should understand MANGLO’s design and engineering level before reading a long claim

## Performance
- Homepage remains primarily server-rendered
- Client code should be limited to interaction/motion/form logic
- Avoid adding animation libraries when native browser APIs can do the job
- Reserve layout geometry to prevent CLS
- Prefer real screenshots only when optimized and worth their payload

## Responsive QA
Test at:
- 375 / 390
- 768
- 1024
- 1440

No document-level horizontal overflow. Horizontal scrolling is allowed only for intentionally designed rails/tabs.
