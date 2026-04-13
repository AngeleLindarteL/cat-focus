# AGENTS.override.md

## Scope

Presentational onboarding views.

## Rules

- Each view component must use its own component folder.
- Views are dumb and prop-driven.
- Views may import shared components and view-local constants/hooks only.
- Views must not import repositories, storage helpers, or Chrome APIs.
- Any onboarding flow orchestration, persistence, or navigation decisions belong in containers.
