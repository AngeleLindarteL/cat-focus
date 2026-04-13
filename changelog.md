# Changelog

## [2026-04-13]
### Author: AngeleLindarteL
### Co-Authors: None
### Resume: Polished the shared stepper and schedule-block experience with dirty-state reminders, relaxed name validation, and preset hover fixes.
### Changes:
- Reworked the shared `Stepper` layout so all steps, including the last one, sit centered over full connector segments.
- Added dirty-state detection for existing schedule edits and surfaced it through an amber reminder card plus an amber dashed schedule-card border.
- Lowered the schedule-name minimum validation threshold from 5 to 3 characters and updated the locale copy.
- Adjusted the popular-sites carousel overflow and button stacking so hover lift animations are not clipped by the scroll container.
- Expanded tests for stepper connectors, schedule dirty-state reminders, validation behavior, and carousel hover class coverage.
- Saved the iteration plan in `docs/plans/schedule-ui-polish-v2.1.2.md`.

### Notes: The unsaved-change reminder is intentionally limited to editing persisted schedules; create mode remains clean until the first save.

## [2026-04-13]
### Author: AngeleLindarteL
### Co-Authors: None
### Resume: Refined the v2.1 schedule-block flow with preset sites, stronger deduplication rules, onboarding step-two gating, and updated architecture guidance for module-local components.
### Changes:
- Added popular-site presets for schedule blocks, including icon assets for Instagram, Facebook, Reddit, X, Amazon, YouTube, TikTok, and Netflix.
- Introduced schedule preset services and a module-local `PopularSiteCarousel` component to support toggle-based preset selection.
- Tightened blocked-site handling so preset selection and manual entry share normalized domain comparison and duplicate prevention behavior.
- Prevented onboarding step 2 from advancing until the schedule-block requirement is satisfied, with coverage in dedicated onboarding tests.
- Expanded test coverage for preset selection, duplicate prevention, onboarding step-two gating, and blocked-site input behavior.
- Recorded the iteration context in `docs/plans/schedule-presets-and-cat-preview-v2.1.0.md` and `docs/plans/schedule-preset-refinements-v2.1.1.md`.

### Notes: This commit builds directly on the v2.1 baseline and formalizes the reusable `components/` space inside feature modules, especially for the schedule module.

## [2026-04-13]
### Author: AngeleLindarteL
### Co-Authors: None
### Resume: Expanded onboarding to v2 with app-managed translations, richer cat customization, and a reusable schedule-block flow embedded into onboarding step two.
### Changes:
- Added the `useTranslation` architecture and persisted language preferences so popup, options, and onboarding UI copy is driven by app state instead of direct locale message calls.
- Extended the cat profile flow with `eyeColor` and `tailColor`, new SVG assets, and the shared `CatColorSelector` component for step-one inputs.
- Updated `PixelCat` and onboarding step-one UX to support the richer cat preview state and cleaner component responsibilities.
- Replaced the placeholder step two experience with a blocker-type selector and introduced the first reusable schedule-block container/view flow.
- Added shared UI building blocks such as `LanguageSelector`, `ToggleGroup`, `WeekdayToggleGroup`, `WebsiteListInput`, `OptionSelector`, `BlockTypeSelector`, and `DeleteScheduleModal`.
- Added schedule repositories, schedule domain types, and validation services to persist and manage reusable schedule-block data.
- Expanded tests around repositories, onboarding flow, and cat profile handling.
- Captured the scope and decisions in `docs/plans/onboarding-v2.md`.

### Notes: This iteration also refactored several UI patterns away from style-only constant buckets and established the foundation later refined by the preset-site follow-up work.

## [2026-04-13]
### Author: AngeleLindarteL
### Co-Authors: None
### Resume: Reworked the starter extension into the first real Cat Focus baseline with project organization, onboarding v1, repositories, i18n, and shared UI primitives.
### Changes:
- Replaced the initial starter layout with an extension-first structure centered on `src/modules`, `src/components`, `src/lib`, `src/popup`, `src/options`, and `src/content`.
- Added the Cat Focus design-system and SVG icon generator skills, removed the Specify scaffolding, and refreshed the repository-level guidance.
- Implemented onboarding v1 with repository-backed step state, cat profile persistence, popup/options gating, shared stepper UI, and step-one validation.
- Added Chrome storage and i18n wrappers plus English and Spanish locale files.
- Created shared presentational components including `PixelCat`, `Stepper`, and `SurfaceCard`.
- Introduced repository abstractions for cat and onboarding data under `src/lib/repositories`.
- Added unit tests covering repositories, onboarding flow, stepper behavior, and cat profile validation.
- Added planning and reference documents in `docs/plans/` and `docs/agents/feedback/`.

### Notes: The main context for this baseline lives in `docs/plans/project-organization-baseline.md` and `docs/plans/onboarding-v1.md`.

## [2026-04-11]
### Author: Angel
### Co-Authors: None
### Resume: Created the initial repository from the Specify template with the base Vite extension scaffold and supporting tooling.
### Changes:
- Bootstrapped the project with Vite, extension entrypoints, base TypeScript configuration, ESLint, and package metadata.
- Added the initial popup and options application shells plus placeholder source files and static assets.
- Included the Specify-generated planning templates, scripts, and memory files that were later replaced during the first Cat Focus iteration.
- Added the first repository-level `AGENTS.md` and README.

### Notes: This was the scaffold starting point before the extension-specific architecture and product features were introduced.
