# AGENTS.override.md

## Scope

Feature modules live here. Each module should bundle its containers, hooks, services, views, and types by feature context.

## Rules

- Organize by feature/module, not by global technical layer.
- Keep module-owned logic inside its module until there is a clear cross-module reuse need.
- A typical module shape is:

```text
module-name/
  containers/
  hooks/
  services/
  views/
  types/
```

- Apply the container/view pattern inside modules.
- Cross-module infrastructure belongs in `src/lib`, not inside a feature module.
