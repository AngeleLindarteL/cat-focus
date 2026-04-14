# AGENTS.md

## Scope

Shared presentational pixel-cat renderer used by onboarding and other future UI.

## Rules

- Keep this component dumb and prop-driven.
- Rendering inputs are fur colors and optional visual-only props.
- Sprite data and palette maps stay in `constants.ts`.
- Types and cell contracts stay in `interfaces.ts`.
- Hook-driven derivation for sprite cells and style variables stays in `usePixelCat.ts`.
- Do not add onboarding flow logic, storage reads, or form ownership here.
