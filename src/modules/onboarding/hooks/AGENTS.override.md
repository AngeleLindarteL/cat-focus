# AGENTS.override.md

## Scope

Reusable hook logic for onboarding.

## Rules

- Hooks here should support onboarding containers and onboarding component folders.
- Keep hooks focused on state derivation, form wiring, or repository-backed data loading.
- Constants for hooks should be extracted to `*.constants.ts` when they are static or reused.
- Hooks should not render JSX.
