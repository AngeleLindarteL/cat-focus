# AGENTS.override.md

## Scope

This module owns onboarding UI flow, onboarding-specific hooks, and feature-local services/types.

## Rules

- Onboarding is repository-backed and should read persisted state through dedicated repositories.
- The module should preserve a clear split between:
  - containers for orchestration
  - hooks for reusable state logic
  - services for pure feature logic and validation helpers
  - views for presentation
  - types for module-local UI contracts
- If onboarding logic becomes shared beyond this feature, move that part to `src/lib`.
