# AGENTS.override.md

## Scope

This folder stores static assets used by extension surfaces.

## Rules

- Prefer static assets here only when the visual cannot be expressed cleanly in code.
- Do not place behavioral logic, generated data, or UI orchestration in this folder.
- Keep filenames descriptive and stable.
- If an asset is specific to a single feature, prefer colocating it with that feature only when the repo intentionally supports that pattern; otherwise keep shared assets here.
