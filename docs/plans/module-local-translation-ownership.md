# Module-Local Translation Ownership Refactor

## Summary

Refactor module-owned views/components so they no longer receive fixed translated copy as individual label props. Instead, pass only `getTranslation` from the root/container boundary into module-specific UI, and resolve static module copy inside those views/components. Keep shared reusable components in `src/components` label-driven, because their copy is legitimately context-dependent.

## Implementation Changes

### Translation ownership rule

- Treat `getTranslation` as the only translation prop allowed for module-owned, non-reusable views/components under `src/modules/**`.
- Remove fixed copy props such as `title`, `description`, `nameLabel`, `submitLabel`, `deleteLabel`, `closeLabel`, and similar from module-local view/component interfaces when that copy is intrinsic to the screen/component.
- Resolve translation keys inside the module-local view/component using `getTranslation(TranslationKey...)`.
- Keep validation messages and dynamic option labels in containers/services where they are composed from runtime state.
- Keep shared reusable components in `src/components/**` prop-driven for labels/placeholders/actions.

### Schedule module refactor

- Update `ScheduleBlockForm` to accept `getTranslation` instead of its current fixed schedule-copy props.
- Keep truly dynamic behavioral props in `ScheduleBlockForm`: values, errors, callbacks, weekday options, popular-site data, editability, mode, reminder visibility, and optional action handlers.
- Move schedule-owned delete confirmation UI from `src/components/DeleteScheduleModal` to `src/modules/schedule/components/DeleteScheduleModal`.
- Update `ScheduleBlockContainer` to stop translating fixed schedule form/modal copy before passing props down; only pass `getTranslation` plus dynamic state/handlers.
- Keep `WebsiteListInput` shared and prop-driven; `ScheduleBlockForm` should translate the schedule-specific labels it passes into it.

### Repo-wide module sweep

- Apply the same refactor to existing module-owned views that currently receive fixed translated copy as props, starting with the already confirmed offenders in `src/modules/onboarding/views/OnboardingStepOneView`, `src/modules/home/views/HomeView`, and `src/modules/onboarding/views/PopupOnboardingRedirectView`.
- Audit other `src/modules/**/views` and module-local `components` for the same pattern and convert them when the copy is intrinsic to the module surface.
- Do not change reusable shared components such as `Stepper`, `OptionSelector`, `SurfaceCard`, `LanguageSelector`, `WebsiteListInput`, `WeekdayToggleGroup`, or similar unless a component is discovered to be single-module and should be relocated.

## Public Interfaces / Type Changes

- Replace fixed copy fields in module-local prop types with `getTranslation: UseTranslationResult["getTranslation"]`.
- Remove the old schedule form and delete modal copy props from their interfaces.
- Update imports for the moved `DeleteScheduleModal` to its schedule-module path.
- Preserve shared component public APIs in `src/components/**` unless a component is reclassified as module-local.

## Test Plan

- Update schedule-related tests to cover the refactored prop shape and confirm schedule form/modal still render the expected translated copy.
- Add or update tests for module-local views refactored in onboarding/home so they render expected translation keys through `getTranslation` without requiring fixed label props.
- Add focused coverage that shared reusable components still accept label props normally and are not coupled to module translation ownership.
- Run the focused Vitest suites for schedule, onboarding, and any shared component tests touched by the refactor.

## Assumptions

- The rule applies to module-owned non-reusable views/components across the repo, not to shared reusable components.
- `getTranslation` is the single allowed translation boundary prop for module-local UI; passing pretranslated fixed copy into those components should be eliminated.
- `DeleteScheduleModal` is schedule-owned and belongs in `src/modules/schedule/components`.
