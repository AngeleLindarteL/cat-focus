# AGENTS.override.md

## Scope

Presentational view for onboarding step 1 cat setup.

## Rules

- Keep this view focused on rendering fields, errors, preview, and submit affordances.
- Form ownership, persistence, and next-step transitions belong in the step container.
- `PixelCat` remains the shared preview renderer; do not move preview business logic here.
- All view-local strings arrive through props or centralized i18n access from the container layer.
