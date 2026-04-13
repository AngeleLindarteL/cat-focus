---
name: cat-focus-design-system
description: Preserve and apply the Cat Focus popup design system for this repository's extension surfaces. Use when creating or restyling popup, options, or shared UI in this repo and the work should match the existing Cat Focus visual language, including warm stone and amber colors, rounded card geometry, soft gradients, spacing rhythm, and restrained typography.
---

# Cat Focus Design System

Apply the existing Cat Focus popup style instead of inventing a new visual direction. Keep the result aligned with the current source of truth in `src/components/SurfaceCard.tsx` and `src/modules/home/views/HomeView.tsx`.

## Workflow

1. Read the current UI source before changing styles:
   - `src/components/SurfaceCard.tsx`
   - `src/modules/home/views/HomeView.tsx`
2. Read `references/design-system.md` for the design tokens and composition rules.
3. Reuse the same visual language for popup, options, and closely related shared components.
4. Keep extension entrypoints thin. Put behavior in containers and presentational styling in views or shared components.

## Rules

- Stay inside this repository's design language. Do not introduce a different theme, brand palette, or generic SaaS styling.
- Prefer warm neutrals, amber accents, large radii, soft elevation, and dense but breathable spacing.
- Keep screens compact and centered. These surfaces are extension UI first, not wide marketing layouts.
- Reuse existing Tailwind utility patterns when possible before adding new abstractions.
- Preserve the card-shell pattern: atmospheric page background, elevated content card, quiet support text, and one clear primary action.
- Use restrained motion only when it materially improves hierarchy. Do not add decorative animation by default.
- Favor sentence-case labels and concise copy.
- If a new screen needs additional tokens, extend the existing system in the same family instead of pivoting styles.

## Implementation Guidance

- For a new surface, start from the current background treatment, card container, and spacing cadence.
- For shared primitives, extract only when at least two surfaces benefit from the same presentation pattern.
- For module views, pass content and callbacks as props; do not couple presentational pieces to Chrome APIs or storage.
- When asked to redesign a Cat Focus surface, preserve these constants unless the user explicitly requests a new direction:
  - warm radial-plus-linear background
  - white card on stone border
  - `rounded-2xl` to `rounded-3xl` geometry
  - high-contrast stone text with subdued support copy
  - single dark primary button with subtle hover lightening

## References

- Read `references/design-system.md` for concrete tokens, spacing values, and reuse patterns.
