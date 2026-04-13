# AGENTS.override.md

## Scope

This folder contains shared non-UI logic: Chrome wrappers, repositories, storage helpers, domain contracts, validators, and cross-module business logic.

## Rules

- Keep `src/lib` framework-light and free from renderable UI.
- Follow the logical/backend bundling rule:

```text
someFeature.ts
someFeature.interfaces.ts
someFeature.constants.ts
```

- Implementation lives in the main file.
- Contracts, storage shapes, and public interfaces live in `*.interfaces.ts`.
- Static keys, defaults, and constants live in `*.constants.ts`.
- Avoid generic `utils` files; name files after the real responsibility.
- Chrome APIs should be isolated here instead of being called from views.
