# Schedule UI Polish V2.1.2

## Summary

Polish the shared onboarding stepper and reusable schedule-block flow with cleaner connector visuals, edit-mode unsaved-change feedback, relaxed schedule-name validation, and a hover-clipping fix for popular-site preset buttons.

## Implementation Changes

### Stepper connector layout

- Rework the shared `Stepper` so each step renders a connector line behind its circle instead of omitting the final connector space.
- Center each step circle over its connector segment using relative positioning and `z-index`.
- Preserve the existing amber/stone active-state behavior so current and previous steps remain highlighted.
- Keep the component API unchanged and keep the component dumb.

### Schedule dirty-state reminder

- Add dirty-state detection in `ScheduleBlockContainer` for expanded existing schedules only.
- Compare the current form state against the persisted schedule after normalizing the values with the same logic used for submit.
- When the expanded existing schedule is dirty:
  - show a compact amber reminder card in `ScheduleBlockForm`
  - highlight the surrounding `ScheduleCard` with an amber dashed border
- Do not show the reminder for create mode.
- Clear the reminder/highlight when the schedule is saved or when the form is reset back to the persisted values.

### Validation and copy

- Lower the schedule-name minimum length from 5 characters to 3 characters in schedule validation.
- Update both locale files with:
  - revised min-length validation copy
  - new schedule unsaved-reminder title and description strings
- Extend `TranslationKey` with the new reminder keys and keep all new schedule UI copy translation-driven.

### Popular-site hover clipping

- Adjust the popular-site carousel wrapper and track to allow the hover lift animation to remain visible.
- Raise hovered/focused preset buttons with `z-index` so they are not visually cut by adjacent content.
- Preserve the existing hover translation and selection behavior.

## Test Plan

- Update stepper tests to assert connectors render for all steps, including the last one.
- Add onboarding step-two coverage for:
  - dirty reminder rendering on existing schedule edits
  - dashed highlighted schedule card while dirty
  - 3-character schedule names passing after a 2-character failure
- Add carousel class-level coverage to confirm the hover-clipping fix remains wired through the rendered classes.
- Run the focused Vitest suite for stepper, onboarding step two, and schedule preset behavior.

## Assumptions

- Unsaved-change UI applies across the reusable schedule-block feature, but only for edits to persisted schedules.
- Dirty-state comparison should use normalized schedule draft values so formatting-only differences do not create false positives.
- The hover-clipping fix is verified through focused styling assertions and build/test validation rather than visual E2E coverage.
