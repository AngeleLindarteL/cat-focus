# AGENTS.override.md

## Scope

Options-page entrypoint files.

## Rules

- Keep `App.tsx` thin and container-driven.
- Do not place feature orchestration, repository reads, or large markup in this folder beyond composition.
- This folder should mainly contain the entry HTML, React bootstrap, and the thin surface app entry.
