# AGENTS.md

## Scope

This module owns the default popup/options home experience outside onboarding.

## Rules

- Keep this module limited to the baseline home states for popup and options.
- Surface-specific orchestration belongs in containers.
- Home views remain presentation-only and reuse shared components where possible.
- If future home behavior starts depending on persisted business rules, keep orchestration in containers or module services, not in views.
