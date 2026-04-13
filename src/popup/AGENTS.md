# AGENTS.md

## Scope

Popup entrypoint files.

## Rules

- Keep `App.tsx` thin and container-driven.
- Popup-specific flow decisions should be delegated to containers in modules.
- Do not accumulate popup business logic in the bootstrap or entrypoint files.
