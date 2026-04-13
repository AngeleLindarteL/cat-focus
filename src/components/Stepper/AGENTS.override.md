# AGENTS.override.md

## Scope

Shared presentational stepper component for multistep UI.

## Rules

- Keep this component dumb and driven entirely by `steps` and `actualStep`.
- Any mapping from persisted onboarding state to stepper props belongs in containers, not here.
- Visual states, labels, and class-name constants belong in local constants/interfaces files.
- Do not import repositories, hooks with side effects, or Chrome APIs here.
