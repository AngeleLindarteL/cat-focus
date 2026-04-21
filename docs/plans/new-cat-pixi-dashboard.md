# New Cat Pixi Dashboard

## Summary

Add an experimental `New Cat` section to the options dashboard without replacing the existing `Your Cat` flow. The new section renders the cat with PixiJS using the idle spritesheet strips under `src/assets/animations/idle_spritesheets`, updates the preview immediately while editing, and persists its own configuration in a separate repository with a `500ms` debounced autosave.

## Key Changes

- Extend the options dashboard hash navigation with a `new-cat` section that sits alongside the current cat, usage, schedule, and preferences sections.
- Add a dedicated `NewCatProfile` storage model and `newCatRepository` instead of reusing the legacy onboarding cat profile.
- Create a new `src/modules/new-cat` feature module with:
  - a container that loads defaults or saved experimental settings
  - a presentational dashboard view with color and fur-type controls
  - a PixiJS canvas component that composes the layered animated cat
  - a pure spritesheet helper that slices each `224x32` strip into seven `32x32` frames
- Keep the rendering order fixed:
  - base fur
  - stripes or spots layers
  - eyes
  - blush
  - outline
- Apply tinting for configurable layers only and keep blush/outline untinted.

## Interfaces

- `NewCatProfile`
  - `baseFurColor`
  - `eyeColor`
  - `furType`
  - `furTypeColor1`
  - `furTypeColor2`
- `NewCatFurType = "stripes" | "spots"`
- `NewCatRepository`
  - `getNewCatProfile()`
  - `saveNewCatProfile(profile)`

## Test Plan

- Cover `#new-cat` hash resolution and section rendering in the options dashboard tests.
- Cover repository persistence for the new storage slice.
- Cover the New Cat container for:
  - first-load defaults
  - loading persisted settings
  - immediate preview updates
  - stripes/spots conditional controls
  - `500ms` debounced autosave
  - save error status handling
- Cover the spritesheet helper frame generation with a pure unit test.

## Defaults

- The experimental profile is independent from the legacy cat profile.
- Defaults apply only when no `newCatProfile` is saved yet.
- `furTypeColor2` remains stored even when the UI hides it in `stripes` mode.
