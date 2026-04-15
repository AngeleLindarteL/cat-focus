# AGENTS.md

## Scope

Options-page dashboard UI and section orchestration after onboarding is complete.

## Rules

- Keep the options entrypoint thin; this module owns the dashboard shell and section switching.
- Containers may orchestrate repositories and hash-based navigation.
- Views remain presentational and receive `getTranslation`.
- Reuse existing module containers instead of duplicating schedule, usage, or preferences logic.
