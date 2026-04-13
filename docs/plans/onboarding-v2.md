# Onboarding V2: translated flow, expanded cat customization, and schedule-block step

## Summary

- Extend onboarding step 1 with two new cat color fields: `eyeColor` and `tailColor`.
- Replace raw color inputs with a shared `CatColorSelector` component that shows label, icon, picker, helper text, and error state.
- Replace placeholder step 2 with a blocker-type selector:
  - `Schedule block`
  - `Usage time block`
- Implement the reusable schedule-block flow now and mount it inside onboarding only in this iteration.
- Add an app-level persisted language system driven by a `useTranslation` hook, with a dumb selector rendered in the top-right of the onboarding card and reused across popup/options copy resolution.
- Refactor away style-only `constants.ts` class-name buckets and state-derived helper functions like `getStepItems()`.

## Implementation Changes

### Translation architecture

- Add app-managed translation state under `src/lib/i18n`.
- Create a persisted language repository using `chrome.storage.local`.
- Normalize browser language on first load:
  - `es*` => `es`
  - anything else => `en`
- Create `useTranslation`.
- `useTranslation` contract:
  - `language: Language`
  - `setLanguage(nextLanguage: Language): Promise<void> | void`
  - `getTranslation: (key: TranslationKey) => string`
- `getTranslation` must be a `useCallback` with `language` dependency.
- Keep translation ownership in principal containers only.
- Pass `language` and `getTranslation` through props into subcontainers, views, and shared components.
- Replace direct `messages.*()` usage in onboarding, popup, and options containers with `getTranslation(...)`.
- Keep Chrome locale files only for extension-level metadata if needed; feature UI text becomes app-driven.

### Step 1: cat customization

- Expand `CatProfile` to:
  - `name`
  - `furColorPrimary`
  - `furColorSecondary`
  - `eyeColor`
  - `tailColor`
- Update cat repository persistence and validation schema.
- Update `PixelCat` so preview renders eye and tail colors distinctly.
- Add pointer cursor to all interactive buttons through component/view button classes.

#### Step 1 form schema

- `CatProfileFormValues`
  - `name: string`
  - `furColorPrimary: string`
  - `furColorSecondary: string`
  - `eyeColor: string`
  - `tailColor: string`

#### Step 1 validation

- `name`
  - required after trim/collapse
  - minimum length: `5`
  - maximum length: `32`
  - block whitespace-only values
- all color fields
  - required
  - must be valid hex color strings
- sanitize before validation/persistence:
  - trim outer whitespace
  - collapse repeated internal whitespace

#### Step 1 components

- `CatColorSelector`
  - shared dumb field wrapper for a cat body-part color
  - props include label, value, icon, input id/name, error, and change/register wiring
  - used for primary fur, secondary fur, eye, and tail
- SVG icons
  - primary fur/body icon
  - secondary fur/patch icon
  - eye icon
  - tail icon
  - generated with `svg-icon-generator`

### Stepper and onboarding shell

- Update shared `Stepper` to render connector lines between circles.
- Connector style follows completed/current/inactive state.
- Keep `Stepper` dumb.
- Convert state-derived step item creation in `OnboardingContainer` to `useMemo`.
- Add `LanguageSelector` to onboarding card top-right.

#### Language selector component

- `LanguageSelector`
  - dumb surface-level language switcher
  - props:
    - `value: Language`
    - `options: Array<{ value: Language; label: string }>`
    - `onChange: (value: Language) => void`
    - `label?: string`
    - `disabled?: boolean`

### Step 2: blocker-type selector

- Replace placeholder step 2 with a selector between:
  - `scheduleBlock`
  - `usageTimeBlock`
- Persist selected blocker type as step-local UI state for now.
- If `usageTimeBlock` is selected, render localized under-construction copy.
- If `scheduleBlock` is selected, render reusable schedule-block container/view.

#### Blocker-type selector component

- `BlockTypeSelector`
  - dumb segmented/radio-style selector
  - props:
    - `value`
    - `options`
    - `onChange`
    - `disabled?`

### Schedule-block flow

- Create reusable schedule-block container/view pair for onboarding now and future settings-page reuse.
- Container prop:
  - `isOnboarding: boolean`
- Outside onboarding:
  - list all schedules as collapsible cards
  - top-right `Create schedule block` button
  - expanded existing card shows edit form
  - expanded existing card shows delete button + confirmation modal
  - expanded card shows close/X button
- Inside onboarding:
  - if one schedule exists, render it expanded and editable
  - if none exist, show onboarding empty state with first-create button
  - max one schedule
  - no delete action
  - no collapse for existing expanded card
  - no top-right create button
- Save schedule in place on step 2; user advances with normal Next action.

#### Schedule data schema

- `ScheduleDays`
  - `monday: boolean`
  - `tuesday: boolean`
  - `wednesday: boolean`
  - `thursday: boolean`
  - `friday: boolean`
  - `saturday: boolean`
  - `sunday: boolean`
- `ScheduleTimeRange`
  - `from: string`
  - `to: string`
- `BlockedSite`
  - `name: string`
  - `domain: string`
- `ScheduleBlock`
  - `id: string`
  - `name: string`
  - `schedule: { days: ScheduleDays; time: ScheduleTimeRange }`
  - `sites: BlockedSite[]`

#### Schedule repository

- Create new repository under `src/lib/repositories`.
- Storage key:
  - `schedule-block-data`
- Methods:
  - `insertOne(schedule: Omit<ScheduleBlock, "id">): Promise<ScheduleBlock>`
  - `updateOneById(id: string, schedule: Omit<ScheduleBlock, "id">): Promise<ScheduleBlock | null>`
  - `findAll(): Promise<ScheduleBlock[]>`
  - `deleteOneById(id: string): Promise<void>`
- Use `crypto.randomUUID()` for IDs.

### Schedule form schema

- `ScheduleBlockFormValues`
  - `name: string`
  - `days: ScheduleDays`
  - `from: string`
  - `to: string`
  - `sites: Array<{ name: string; domain: string }>`

#### Schedule form validation

- `name`
  - required
  - trim/collapse spaces before validation/persistence
  - minimum length: `5`
  - maximum length: `48`
- `days`
  - all keys required
  - default value enabled Mon-Fri
- `from`
  - required
  - valid `HH:MM` 24-hour format
- `to`
  - required
  - valid `HH:MM` 24-hour format
  - must be later than `from`
- `sites`
  - minimum length: `1`
  - every item requires non-empty `name`
  - every item requires valid domain
  - normalize entered URL/path to domain only before save
  - reject invalid domain before add/update

### Schedule form components

- `ScheduleBlockForm`
  - presentational form used for create and edit
  - props cover labels, values, field errors, callbacks, and optional delete/close actions
- `ScheduleCard`
  - collapsible wrapper for one schedule item
- `ScheduleSummary`
  - dumb summary for collapsed schedule card
- `ScheduleEmptyState`
  - empty-state CTA for zero schedules
- `DeleteScheduleModal`
  - confirmation modal for delete action

### Specialized field components

- `WeekdayToggleGroup`
  - dedicated dumb multiple enable/disable selector for weekdays
  - `forwardRef`
  - `useImperativeHandle`
  - internal state only
  - ref contract exposes `{ value: ScheduleDays }`
- `WebsiteListInput`
  - shared component for create/edit/delete site entries
  - normalizes URL to domain before commit
  - rejects invalid domains before item enters the array

## Public Interfaces / Types

- `type Language = "en" | "es"`
- `type TranslationKey = ...`
- `type CatProfile = { name: string; furColorPrimary: string; furColorSecondary: string; eyeColor: string; tailColor: string }`
- `type BlockType = "scheduleBlock" | "usageTimeBlock"`
- `type ScheduleDays = { monday: boolean; tuesday: boolean; wednesday: boolean; thursday: boolean; friday: boolean; saturday: boolean; sunday: boolean }`
- `type ScheduleBlock = { id: string; name: string; schedule: { days: ScheduleDays; time: { from: string; to: string } }; sites: Array<{ name: string; domain: string }> }`
- `interface ScheduleRepository { insertOne(...); updateOneById(...); findAll(); deleteOneById(...); }`
- `type DayToggleOption = { name: keyof ScheduleDays; label: string; default: boolean }`
- `type DayToggleRef = { value: ScheduleDays }`

## Test Plan

- Translation tests:
  - browser language normalization
  - persisted language override
  - correct strings in popup/options/onboarding
- Stepper tests:
  - connector lines render between steps
  - current/completed/inactive styling logic
- Step 1 tests:
  - four color fields validate and prefill
  - preview updates for eye/tail as well as fur colors
- Schedule repository tests:
  - insert/update/find/delete
  - empty storage returns `[]`
  - stable IDs on update
- Specialized field tests:
  - `WeekdayToggleGroup` ref exposes current dictionary value
  - `WebsiteListInput` rejects invalid domains and normalizes valid URLs
- Schedule flow tests:
  - onboarding mode allows only one schedule
  - onboarding mode hides delete and collapse-close
  - non-onboarding mode supports create/edit/delete/expand/collapse
  - expanded existing onboarding schedule opens automatically on resume
- Step 2 tests:
  - selector switches between schedule view and under-construction state
  - saving schedule does not auto-advance

## Assumptions

- App-level language selection is persisted and applies immediately across onboarding, popup, and options.
- Step 2 reusable schedule UI is implemented now but only mounted inside onboarding in this iteration.
- Step 3 remains the current completion screen.
- SVG icons are generated with `svg-icon-generator`.
- Unsupported browser languages fall back to English.
