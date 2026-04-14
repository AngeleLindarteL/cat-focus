# AGENTS.md

## Scope

Feature modules live here. Each module should bundle its containers, hooks, services, views, types, and module-local reusable components by feature context.

## Rules

- Organize by feature/module, not by global technical layer.
- Keep module-owned logic inside its module until there is a clear cross-module reuse need.
- A typical module shape is:

```text
module-name/
  containers/
  components/
  hooks/
  services/
  views/
  types/
```

- Apply the container/view pattern inside modules.
- Keep screen-level and form-level presentation in `views/`.
- Put smaller reusable module-owned UI pieces in `components/`.
- Module-owned non-reusable views/components must receive `getTranslation` instead of pre-resolved fixed copy props.
- Resolve fixed module copy inside the module-owned UI with `getTranslation(...)`; only pass translated label props into shared reusable components when their copy is context-dependent.
- Cross-module infrastructure belongs in `src/lib`, not inside a feature module.
- For one-time async initialization in containers/hooks, do not call a `setState`-heavy refresh helper directly inside `useEffect`.
- Prefer a one-time effect dedicated to the initial load, and keep reusable reload helpers wrapped in `useCallback` for user-triggered refresh paths.
- All clickable buttons in module-local components and views must include pointer cursor behavior.
