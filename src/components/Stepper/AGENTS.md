# AGENTS.md

## Scope

Shared presentational stepper component for multistep UI.

## Rules

- Keep this component dumb and driven entirely by `steps` and `actualStep`.
- Any mapping from persisted onboarding state to stepper props belongs in containers, not here.
- Keep visual state decisions local to the component; do not move Tailwind class strings into `constants.ts` just to name them.
- Do not import repositories, hooks with side effects, or Chrome APIs here.
