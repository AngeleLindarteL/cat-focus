# AGENTS.override.md

## Scope

This folder contains content-script logic that runs in the host page context.

## Rules

- Treat this folder as page-side logic, not React surface code.
- Follow the logical/backend bundling rule:

```text
someFeature.ts
someFeature.interfaces.ts
someFeature.constants.ts
```

- Keep DOM mutation, observers, and host-page listeners explicit and tightly scoped.
- Clean up every observer, listener, interval, and page-side side effect.
- Do not place popup/options UI logic here.
- Do not block the main thread with expensive page work.
