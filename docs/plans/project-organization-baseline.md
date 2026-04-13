# Project Organization Baseline

## Summary

Establish an extension-first baseline that matches `AGENTS.md` and removes the remaining Vite starter layout. Popup and options remain thin entrypoints. Feature logic lives under `src/modules`, shared UI under `src/components`, and reusable browser helpers under `src/lib`.

## Decisions

- Use `src/modules/home` as the first module for the baseline popup/options screens.
- Keep shared UI presentational and surface-specific behavior in containers.
- Route Chrome extension actions through small wrappers in `src/lib/chrome`.
- Keep the content script bootstrap minimal until there is actual page-side functionality to own.
- Remove invalid sidepanel manifest wiring until a real sidepanel surface is introduced.

## Follow-on Work

- Add storage abstractions for persisted settings in `src/lib`.
- Split future popup and options features into dedicated modules when behavior diverges.
- Add unit tests for Chrome wrappers, storage adapters, and non-trivial module logic as features land.
