# AGENTS.override.md

## Scope

Chrome platform wrappers used by the rest of the app.

## Rules

- Keep wrappers thin, typed, and narrowly scoped to a specific Chrome API concern.
- Do not mix unrelated Chrome APIs in one file.
- Validate and normalize boundary behavior here when possible.
- Call these wrappers from containers, services, or repositories, not from views.
