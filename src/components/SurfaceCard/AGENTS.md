# AGENTS.md

## Scope

Shared surface shell for Cat Focus UI.

## Rules

- Preserve the Cat Focus visual language from the current design system.
- This component stays presentation-only and should not own behavior.
- Keep Tailwind class strings inline in the component; do not extract them into `constants.ts`.
- Props and public types belong in `interfaces.ts`.
- Use this component to compose popup/options cards before introducing a new shared shell.
