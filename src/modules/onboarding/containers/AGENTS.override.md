# AGENTS.override.md

## Scope

Containers that orchestrate onboarding flow.

## Rules

- Containers own repository calls, loading behavior, step transitions, and form submission orchestration.
- Containers may import hooks, repositories, services, and views.
- Containers must not accumulate markup-heavy rendering; push render details into views.
- The onboarding stepper state should be derived from repository-backed onboarding state.
- Resume behavior and prefilling should be handled here or in supporting hooks, not in views.
