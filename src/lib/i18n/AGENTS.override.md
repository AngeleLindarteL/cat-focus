# AGENTS.override.md

## Scope

Shared i18n access helpers and message accessors.

## Rules

- Centralize message access here instead of scattering raw `chrome.i18n.getMessage` calls.
- Keep this layer free from UI markup.
- Expose message helpers that are easy for containers and views to consume.
- All user-facing copy added for features should have locale coverage and route through this folder or adjacent locale files.
