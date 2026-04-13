# AGENTS.override.md

## Scope

Top-level presentational shell for onboarding screens.

## Rules

- This view composes the shared shell and stepper presentation only.
- It must not know how onboarding state is loaded or persisted.
- Loading state is visual-only here; actual data loading remains in containers/hooks.
- Reuse `SurfaceCard` and `Stepper` instead of duplicating shell logic.
