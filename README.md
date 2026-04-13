# Cat Focus

Chrome extension project built with Vite, `@crxjs/vite-plugin`, React 19, TypeScript, and Tailwind CSS v4.

## Architecture

This repo is organized as an extension-first codebase:

- `src/popup`: popup entrypoint and top-level popup app
- `src/options`: options entrypoint and top-level options app
- `src/content`: content-script bootstrap and page-side logic
- `src/components`: shared presentational UI
- `src/modules`: feature-owned containers, views, services, hooks, and types
- `src/lib`: shared extension helpers and framework-light utilities
- `docs/plans`: implementation plans and feature specs

The current baseline keeps popup and options thin and routes behavior through module containers.

## Commands

- `rtk npm run dev`
- `rtk npm run build`
- `rtk npm run lint`

## Current Baseline

- Popup renders a minimal extension shell with a path to the options page.
- Options renders a matching baseline screen intended for future storage-backed settings.
- Content script uses a lightweight bootstrap guard and avoids page-side side effects beyond initialization.
