# AGENTS.md

## Scope

Pure onboarding feature logic such as validation, sanitization, and transformations.

## Rules

- Keep services framework-light and side-effect free when possible.
- Validation and sanitization logic belongs here rather than inside containers or views.
- If a service grows contracts or constants, split them into explicit feature-scoped files.
- Prefer deterministic pure functions that are easy to unit test.
