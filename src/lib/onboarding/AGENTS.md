# AGENTS.md

## Scope

Shared onboarding domain contracts and onboarding-specific non-UI constants.

## Rules

- Keep onboarding domain types and constants here when they are shared across repositories, hooks, or containers.
- `onboarding.interfaces.ts` owns domain contracts such as step state and persisted models.
- `onboarding.constants.ts` owns storage keys and other static onboarding config.
- Do not add repository implementations or UI rendering logic here.
