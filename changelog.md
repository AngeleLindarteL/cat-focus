# Changelog

## [2026-04-14]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Added a development-only floating options overlay for onboarding shortcuts and block-data cleanup, gated by `chrome.management.getSelf()`.

### Changes:

- Added the `management` permission to `manifest.config.ts` and introduced a thin Chrome management wrapper under `src/lib/chrome` to detect development installs via `chrome.management.getSelf()`.
- Extended onboarding, usage, and schedule repositories with explicit reset and clear-all operations so the new developer tools can mutate state through repository contracts instead of UI-side storage calls.
- Added a new `src/modules/options-developer-tools` module with a floating card-style overlay rendered from `OptionsGateContainer` across onboarding, finish, and dashboard states.
- Wired developer actions for skipping onboarding, resetting onboarding, clearing all usage-limit blocks, and clearing all schedule blocks, with inline success/error feedback.
- Expanded Chrome mocks and added focused Vitest coverage for management detection, repository reset/clear-all behavior, and developer-tools visibility/actions.

### Notes: Verified with targeted tests for repository state, Chrome management detection, and options-page developer tools behavior.

## [2026-04-14]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Replaced the post-onboarding options placeholder with a floating dashboard shell that reuses the Cat Focus design system and exposes editable cat, usage, schedule, and preferences sections.

### Changes:

- Added a new `src/modules/options-dashboard` module with a floating options shell, left-side section navigation, hash-based section persistence, and responsive dashboard layout aligned with the Cat Focus design system.
- Replaced the finished-onboarding options branch in `OptionsGateContainer` so the options page now renders the real dashboard instead of the old generic home card.
- Added a standalone options cat editor container that reuses the onboarding cat form/view but saves without mutating onboarding progress and uses edit-mode submit copy.
- Reused the existing standalone usage, schedule, and user-preferences containers inside the dashboard, with a new preferences wrapper to preload saved values.
- Added new English/Spanish copy for dashboard navigation, section descriptions, and cat edit submit text.
- Added `docs/plans/options-dashboard.md` plus focused dashboard tests covering hash routing, section switching, cat persistence, and preferences persistence; updated onboarding flow expectations for the new post-finish destination.

### Notes: Verified with `rtk npm test -- --run tests/optionsDashboard.test.tsx tests/onboardingFlow.test.tsx`, `rtk npm run build`, and `rtk npm run lint`.

## [2026-04-14]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Implemented onboarding v4 step-three profile capture with reusable user-preferences form, merged preference patch persistence, and a post-finish celebration screen with confetti.

### Changes:

- Added a reusable `src/modules/user-preferences` form module with creation/edition mode support for `userName` and `installationReason`, including validation and normalization.
- Extended `userPreferencesRepository` contracts and implementation with patch-based updates so language updates no longer overwrite other preference fields.
- Updated `useTranslation` to persist language via merged preference patches.
- Replaced onboarding step-three placeholder rendering with the new profile form flow and changed final onboarding CTA copy to "Start your journey".
- Added onboarding finish container/view with confetti (`@tsparticles/confetti`), centered customized cat preview, translated finish content, and continue-to-home action.
- Updated `OptionsGateContainer` to show the finish screen only right after in-session onboarding completion.
- Fixed layout wrappers for options surfaces so `fit-content` is no longer applied to options home or onboarding finish, preventing collapsed/broken page layout.
- Updated the finish-screen quote treatment to render italicized text inside `<< >>`, added explicit attribution to `Confucio (Confucius)`, and centered the congratulation card in the viewport.
- Added `docs/plans/onboarding-v4.md` implementation spec.
- Expanded onboarding and repository tests for profile-step rendering, finish-screen transition, and merged user-preferences persistence.
- Added dependency: `@tsparticles/confetti` via `pnpm`.

### Notes: This iteration keeps existing onboarding step-two schedule/usage logic unchanged and scopes v4 to step-three profile persistence plus post-finish UX.

## [2026-04-14]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Audited all interactive buttons across the extension and added missing `cursor-pointer` and `disabled:cursor-not-allowed` where needed.

### Changes:

- Added `cursor-pointer` to the primary action button in `src/modules/home/views/HomeView/HomeView.tsx`.
- Added `cursor-pointer` to the submit button in `src/modules/onboarding/views/OnboardingStepOneView/OnboardingStepOneView.tsx`.
- Added `cursor-pointer` to both the `PRIMARY_ACTION` and `SECONDARY_ACTION` class name constants in `src/modules/onboarding/views/OnboardingStepPlaceholderView/constants.ts`.
- Added `disabled:cursor-not-allowed` to the back button in `src/modules/onboarding/views/OnboardingStepTwoView/OnboardingStepTwoView.tsx`, which was conditionally disabled via `disabled={isPreviousActionDisabled}` but lacked the corresponding cursor override.

### Notes: All other buttons in the codebase already had `cursor-pointer` (and `disabled:cursor-not-allowed` where applicable). No behavior changes — purely visual/UX consistency.

## [2026-04-14]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Replaced the usage-block daily-limit field with a custom hours/minutes input, tightened block-form submit behavior, refreshed onboarding copy, fixed stepper/navigation issues, removed the anti-pattern of storing Tailwind className strings in `constants.ts` files, and audited cursor-pointer across all interactive buttons.

### Changes:

#### Usage-block daily-limit field

- Replaced the single time field with a custom `UsageLimitTimeInput` component that renders separate number inputs for `Hours` and `Minutes`.
- Updated the usage form service to store `limitHours` and `limitMinutes` in UI state while still persisting the combined value as `HH:MM`.
- Added separate validations for missing or out-of-range hours/minutes and surfaced errors under each input.

#### Block-form submit behavior

- Disabled schedule and usage submit buttons when the draft has no changes or is invalid.
- Switched submit button copy between create/update modes.
- Replaced the native `title` submit hints with an animated shared `Tooltip` wrapper component and wired it into schedule/usage disabled-submit reasons.

#### Onboarding copy and navigation

- Updated the onboarding card description, step-two helper text, and step-two stepper label to cover both schedule and usage block flows.
- Fixed stepper reachability so returning to step one after completing it still allows direct navigation back to steps two and three when saved state permits.

#### className cleanup — removed Tailwind strings from `constants.ts`

| File                                                                      | Action                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `src/components/PixelCat/PixelCat.tsx`                                    | 3 className vars moved inline; `PIXEL_CAT_SPRITE` and `PIXEL_CAT_PALETTE_MAP` remain |
| `src/components/PopularSiteCarousel/constants.ts`                         | 3 className vars moved inline → file deleted                                         |
| `src/components/SurfaceCard/constants.ts`                                 | 4 unused className-only exports deleted → file deleted                               |
| `src/components/Stepper/constants.ts`                                     | 6 unused className-only exports deleted → file deleted                               |
| `src/modules/home/views/HomeView/constants.ts`                            | 6 className vars moved inline → file deleted                                         |
| `src/modules/schedule/components/PopularSiteCarousel/constants.ts`        | 3 className vars moved inline → file deleted                                         |
| `src/modules/onboarding/views/OnboardingView/constants.ts`                | 2 unused className-only exports deleted → file deleted                               |
| `src/modules/onboarding/views/OnboardingStepPlaceholderView/constants.ts` | 4 className vars moved inline → file deleted                                         |
| `src/modules/onboarding/views/OnboardingStepOneView/constants.ts`         | 7 className vars moved inline → file deleted                                         |

#### AGENTS.md corrections

- `src/components/PixelCat/AGENTS.md` — removed "local class constants" from the list of things that belong in `constants.ts`.
- `src/components/SurfaceCard/AGENTS.md` — replaced wrong rule ("class constants belong in `constants.ts`") with an explicit inline-className rule.

#### cursor-pointer audit

- Added missing `cursor-pointer` to all interactive buttons that lacked it.
- Added `disabled:cursor-not-allowed` to the back button in `OnboardingStepTwoView`.

#### Tests

- Expanded onboarding and blocked-site tests to cover split inputs, disabled-submit behavior, stepper reachability, and blocked-site grid/truncation.

### Notes: The daily-limit replacement is scoped to the usage-block time field and does not alter schedule time inputs. The className cleanup is a pure refactor with no behavior changes.

## [2026-04-13]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Implemented onboarding v3 with reusable usage-time blocks, shared blocked-site primitives, and step-two unsaved-draft navigation locking.

### Changes:

- Added the reusable usage-block domain, Chrome storage repository, validation/draft services, onboarding-aware container, and module-local usage form/card/summary/empty-state/delete-modal UI under `src/lib/usage`, `src/lib/repositories/usageRepository*`, and `src/modules/usage`.
- Extracted blocked-site normalization, duplicate detection, and popular-site presets into shared `src/lib/blockedSites` primitives and introduced a shared `src/components/PopularSiteCarousel` so schedule and usage forms reuse the same site-building surfaces.
- Updated `WebsiteListInput`, schedule preset services, and the schedule container so both block flows share domain normalization while schedule create/edit drafts now report blocking unsaved state the same way usage drafts do.
- Replaced the onboarding step-two usage placeholder with the real usage container, changed step-three eligibility to `schedule || usage`, and locked block-type switching, stepper navigation, and back/next actions while step-two has unsaved changes.
- Added usage-specific translations plus focused repository, onboarding step-two, onboarding flow, preset carousel, and shared input coverage for the new behavior.

### Notes: Verified with `rtk npm test -- --run tests/repositories.test.ts tests/scheduleSitePresets.test.tsx tests/websiteListInput.test.tsx tests/onboardingStepTwoContainer.test.tsx tests/onboardingFlow.test.tsx` and `rtk npm run build`.

## [2026-04-13]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Added the onboarding v3 implementation plan for reusable usage-time blocks, step-two OR gating, and unsaved-draft navigation locking.

### Changes:

- Added `docs/plans/onboarding-v3.md` with the scoped implementation plan for the reusable usage-time block module and its onboarding step-two integration.
- Defined the target repository contract, module structure, shared-component reuse strategy, validation rules, onboarding-specific constraints, and delivery sequence for the new usage flow.
- Documented the step-two refactor needed to lock stepper and back/next navigation while schedule or usage drafts contain unsaved changes.

### Notes: This entry records planning work only; implementation is still pending.

## [2026-04-13]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Added clickable onboarding step navigation, centralized step reachability in a hook, and upgraded the shared stepper with interactive hover states.

### Changes:

- Extended the shared `Stepper` item contract with optional per-step `onClick` support and rendered clickable circles as interactive controls only when a step is reachable.
- Added a hover treatment for clickable step circles using the existing amber/stone Cat Focus visual language, including pointer cursor, brighter shadow, and slight lift.
- Introduced `useOnboardingStepper` to centralize onboarding step reachability, direct step navigation, and shared back/next transition rules for stepper clicks and step actions.
- Refactored `OnboardingContainer` and `OnboardingStepTwoContainer` so step-two completion state drives both the next-button disabled state and whether step three is directly clickable.
- Expanded stepper and onboarding flow tests to cover clickable step behavior, blocked future-step navigation, and direct jump-to-step behavior after validation passes.
- Added the implementation plan record in `docs/plans/onboarding-clickable-stepper.md`.

### Notes: Verified with targeted Vitest runs for the shared stepper plus onboarding flow and step-two container coverage.

## [2026-04-13]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Clarified blocked-site copy, moved site validation feedback inline, and replaced per-site delete text with a trash icon action.

### Changes:

- Added dedicated translation keys for blocked-site manual entry actions, placeholders, cancel editing, and delete-site accessibility labels in English and Spanish.
- Refactored `WebsiteListInput` so name/domain validation errors render directly under the affected input, the invalid field is marked visually, and the old hardcoded English invalid-domain fallback is removed.
- Kept the schedule-level empty-sites validation separate as a list-level error while local add/edit validation is now handled inside the blocked-site input component.
- Replaced the per-site textual delete action with an icon-only trash button that keeps an accessible translated `aria-label`.
- Updated `ScheduleBlockForm` and `ScheduleBlockContainer` to use the new site-specific labels and error wiring.
- Expanded `tests/websiteListInput.test.tsx` to cover the new placeholders, inline validation states, translated cancel action, and icon-only delete button behavior.

### Notes: Verified with `rtk npm test -- --run tests/websiteListInput.test.tsx` and `rtk npm run build`.

## [2026-04-13]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Moved fixed translation ownership into module-local UI, relocated the schedule delete modal into the schedule domain, and documented the rule in module guidance.

### Changes:

- Refactored module-owned views and components in schedule, onboarding, and home so fixed copy is resolved with `getTranslation` inside the module UI instead of being passed as individual props.
- Moved `DeleteScheduleModal` from shared `src/components` into `src/modules/schedule/components` and updated schedule flow imports and props accordingly.
- Kept shared reusable components such as `WebsiteListInput`, `Stepper`, `OptionSelector`, and selectors prop-driven for labels because they remain context-dependent.
- Updated `src/modules/AGENTS.md`, plus the `schedule`, `onboarding`, and `home` module guidance files, to enforce the module-local translation ownership rule.
- Added the implementation record in `docs/plans/module-local-translation-ownership.md`.

### Notes: The rule now applies to module-owned non-reusable UI only; shared components under `src/components` still accept labels and placeholders as props by design.

## [2026-04-13]

### Author: AngeleLindarteL

### Co-Authors: None

### Resume: Migrated app translations to custom locale dictionaries, restored standard Chrome locale files for fallback usage, and synchronized weekday toggles through state.

### Changes:

- Replaced the suffix-based `_locales` duplication with app-owned `en` and `es` translation catalogs under `src/lib/i18n`.
- Refactored `useTranslation` so persisted user language preferences read from the custom catalog, while users without a saved preference fall back to Chrome `i18n` messages and UI locale detection.
- Flattened `_locales/en/messages.json` and `_locales/es/messages.json` back to standard Chrome message keys so extension-managed fallback localization remains valid.
- Updated the test Chrome mock and onboarding coverage to validate both persisted-language selection and Chrome-locale fallback behavior.
- Added weekday toggle change propagation so the schedule form no longer depends on reading refs during render, which resolves the React Hooks lint violation surfaced during verification.

### Notes: The in-app language selector now owns extension UI copy after a preference is saved; Chrome locale resolution is only used before that preference exists.

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
