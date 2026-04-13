# Schedule Preset Refinements V2.1.1

## Summary

Refine the schedule preset-site experience, tighten blocked-site deduplication, enforce onboarding progression rules for step 2, and update architecture guidance so module-local reusable UI can live in `components/` inside a feature module. This iteration builds directly on `v2.1.0`.

## Implementation Changes

### Module structure and AGENTS guidance

- Move `PopularSiteCarousel` out of `src/modules/schedule/views` into a module-local `components/` folder under `src/modules/schedule`.
- Treat module-local reusable UI as distinct from `views`:
  - `views/` remain screen-level or form-level presentational surfaces
  - `components/` hold smaller reusable UI pieces owned by that module
- Update the corresponding guidance files to make this explicit:
  - `AGENTS.md`
  - `src/modules/AGENTS.md`
  - add `src/modules/schedule/AGENTS.md` if the schedule module still lacks one
  - update any existing schedule-local AGENTS docs that reference views/components boundaries
- Add button interaction guidance to the relevant AGENTS docs:
  - all clickable buttons should include pointer cursor behavior
  - this applies to shared components and module-local components/views

### Popular site carousel styling and interaction

- Remove shadow styling from popular-site buttons.
- Replace the visual emphasis with border-based treatment only.
- Keep the buttons circular and preserve the current Cat Focus palette.
- Ensure hover state includes `cursor: pointer`.

### Blocked-site deduplication

- Implement deduplication against normalized domains across both preset selection and manual entry.
- Normalize domains before comparison so these are treated as the same site:
  - `x.com`
  - `www.x.com`
  - `https://x.com`
  - `https://www.x.com`
- Apply the same normalization rule to:
  - preset-site add/remove behavior
  - manual site creation
  - manual site editing
- Keep persistence normalized to hostname-only values after deduplication.
- If the user tries to add a duplicate domain manually, do not create a second item.
- Prefer a single shared normalization/dedup helper in schedule services so comparison rules are consistent in one place.

### Preset toggle behavior

- Change preset buttons from one-way add actions to toggle actions.
- When a preset is not selected:
  - clicking it adds the site to the blocked list
- When a preset is selected:
  - clicking it removes the matching site from the blocked list
- The selected state must derive from the normalized domain set, not from display name matching.

### Preset-backed item editing rules

- If a blocked site is currently represented by a selected preset, do not allow editing that list item.
- Delete/removal remains allowed so the user can unselect it.
- Manual non-preset sites remain editable.
- If a preset-backed item is removed, the corresponding preset button returns to the unselected state.

### Onboarding step-2 progression rule

- Prevent progression from onboarding step 2 to step 3 until blocking requirements are valid.
- Add a memoized validity gate in the step-2 flow:
  - `scheduleBlockValid`
  - `usageBlockTimeValid`
  - `canContinueToStepThree = scheduleBlockValid && usageBlockTimeValid`
- For this iteration:
  - `scheduleBlockValid` is `true` only when at least one schedule block exists
  - `usageBlockTimeValid` is hardcoded `true` because the module does not exist yet
- Disable the step-2 next action until `canContinueToStepThree` is `true`.
- Structure the code so the future usage-time-block module can plug into the same gate without rewriting the stepper logic.

## Test Plan

- Add schedule tests for:
  - domain normalization equality across raw, `www`, and `https` variants
  - duplicate prevention for manual add
  - duplicate prevention for manual edit
  - preset toggle add/remove behavior
  - preset-backed items rendering as non-editable
- Add onboarding tests for:
  - step 2 next action disabled when no schedule exists
  - step 2 next action enabled after the first schedule block is created
  - validity memo behavior remains compatible with future `usageBlockTimeValid`
- Add or update tests for AGENTS/documentation only if the repo already validates docs shape; otherwise keep docs changes untested.

## Assumptions

- Domain matching will be implemented with shared normalization logic that may use regex as part of parsing/cleanup, but the critical requirement is consistent equality across URL/domain variants.
- Selected preset items are removable but not editable.
- The schedule module is allowed to introduce a module-local `components/` folder without moving shared cross-module UI out of `src/components`.
- The step-2 continue gate will only validate schedule-block existence in this iteration, while preserving the placeholder `usageBlockTimeValid` hook point for later work.
