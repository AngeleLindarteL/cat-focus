# AGENTS.md

## Scope

This folder contains shared React components reused across modules or extension surfaces.

## Rules

- Evert component must follow our design system, use $cat-focus-design-system skill to achieve this.
- Every shared component must live in its own folder.
- Default component shape:

```text
ComponentName/
  ComponentName.tsx
  index.ts
  interfaces.ts
  constants.ts
  useComponentName.ts
```

- `index.ts` is the public barrel.
- `interfaces.ts` stores props and local public types.
- `constants.ts` stores true constants and static config only; do not use it as a bucket for Tailwind class-name strings.
- Add `useComponentName.ts` only when the component has real local hook logic.
- Shared components must remain presentational and must not talk directly to repositories, storage, or Chrome APIs.
- Prefer imports through the component folder barrel.
- All clickable buttons in shared components must include pointer cursor behavior.
