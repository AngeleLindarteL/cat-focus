# AGENTS.override.md

## Scope

Shared home view used to render the default popup/options home shell.

## Rules

- Keep this view generic and reusable across home surfaces.
- Maintain the Cat Focus shell composition with `SurfaceCard`.
- Local view classes and static UI values belong in `constants.ts`.
- Public props belong in `interfaces.ts`.
- Keep this view free from navigation logic and Chrome calls.
