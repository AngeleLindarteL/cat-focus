# Onboarding V3: reusable usage-time blocks and step-two draft locking

## Summary

Implement the second blocker mode introduced in onboarding v2 by building a reusable usage-time block module, wiring it into onboarding step two, and tightening step-two navigation rules so unsaved edits lock both the stepper and the back/next actions until the draft is saved.

## Implementation Changes

### Usage-time block domain and repository

- Add a new usage-block domain under `src/lib` with explicit contracts for:
  - `UsageBlock`
  - `UsageBlockLimit`
  - `UsageBlockSite`
- Persist usage blocks through a new repository under `src/lib/repositories` backed by `@/lib/chrome/storage`.
- Storage key:
  - `usage-block-data`
- Repository contract:
  - `insertOne(block: Omit<UsageBlock, "id">): Promise<UsageBlock>`
  - `updateOneById(id: string, block: Omit<UsageBlock, "id">): Promise<UsageBlock | null>`
  - `findAll(): Promise<UsageBlock[]>`
  - `deleteOneById(id: string): Promise<void>`
- Use `crypto.randomUUID()` for creation IDs.
- Normalize persisted sites so only the domain is stored even when the user enters a full URL or path.
- Default `limit.resetsAt` to `00:00` and keep it non-editable in the UI.

### Reusable usage-time module

- Create a new `src/modules/usage` module following the same container/view split already used by `src/modules/schedule`.
- Keep entry surfaces thin and reuse the module in:
  - onboarding step two
  - the future non-onboarding settings/options surface
- Mirror the reusable schedule-block interaction model outside onboarding:
  - render a list of usage-limit cards
  - each card shows a collapsed summary by default
  - clicking a summary expands the card into edit mode
  - expanded cards can collapse again
  - expanded cards expose delete action with confirmation modal
- Mirror the onboarding-specific constraints inside onboarding:
  - if one usage block already exists, render that card expanded and ready to edit
  - if none exists, render the onboarding empty state with a single create CTA
  - allow at most one usage block
  - hide delete while `isOnboarding === true`
  - prevent collapsing the existing onboarding usage card

### Shared reusable components

- Keep `WebsiteListInput` as the shared blocked-site editor and extend it only if usage-specific behavior requires additional generic props.
- Promote the popular-sites selector into a shared component under `src/components` so both schedule and usage forms use the same reusable surface.
- Keep shared components dumb and prop-driven:
  - usage and schedule forms own translation lookup
  - shared components receive labels, placeholders, preset items, and callbacks through props

### Usage form model and validation

- Add a dedicated usage-form service bundle, parallel to `scheduleBlockForm`, to own:
  - default values
  - draft creation
  - form-value to persisted-shape mapping
  - equality comparison for dirty detection
  - validation
- `UsageBlockFormValues` should include:
  - `name: string`
  - `limitTime: string`
  - `sites: Array<{ name: string; domain: string }>`
- Validation rules:
  - `name`
    - required
    - trim/collapse spaces before validation and save
    - minimum length: `3`
  - `limitTime`
    - required
    - valid `HH:MM` 24-hour format
  - `sites`
    - minimum length: `1`
    - each item requires non-empty `name`
    - each item requires a valid website/domain
    - normalize URL input to domain-only before add/update
    - reject invalid domains before the site enters the array
- Default create values:
  - `name: "Adult sites"`
  - `limitTime: "01:00"`
  - `sites: []`
  - persisted `resetsAt: "00:00"`

### Usage form UI and behavior

- Build a `UsageBlockForm` view based directly on the current `ScheduleBlockForm` structure and interaction patterns.
- Reuse schedule-form behavior where it applies:
  - dirty draft reminder for persisted edits
  - clear list-level site validation after successful changes
  - popular-site preset selection
  - create and edit modes
- Adapt the form fields to usage-time semantics:
  - text input for block name
  - single `type="time"` input for daily limit
  - shared website list input
  - shared popular-sites section
- Add a dedicated usage card summary that clearly shows:
  - limit name
  - daily time limit
  - site count
- Add a delete-confirmation modal for non-onboarding usage cards unless an existing shared confirm surface is generic enough to reuse cleanly.

### Onboarding step-two integration

- Extend `OnboardingStepTwoContainer` to load and track both persisted block types:
  - schedule blocks
  - usage blocks
- Replace the placeholder usage construction state with the real reusable usage container.
- Fix step-three eligibility so it becomes:
  - `scheduleBlockValid || usageBlockTimeValid`
- `usageBlockTimeValid` should reflect whether at least one persisted usage block exists.
- Keep the block-type selector UI, but both branches must now mount real reusable module containers.
- Preserve the current onboarding rule that users can keep only one block of each type while inside the onboarding-specific view.

### Step-two draft locking refactor

- Introduce a step-two container-level draft lock contract instead of only disabling `Next` from completion-state validation.
- Step-two should surface two independent booleans upward:
  - `canContinueToStepThree`
  - `hasBlockingUnsavedChanges`
- While `hasBlockingUnsavedChanges` is true:
  - disable the onboarding `Back` button
  - disable the onboarding `Next` button
  - remove stepper click navigation away from the current step
- Apply this rule to both reusable block modules:
  - existing schedule-block edits already have dirty-state detection and should now report it upward
  - new usage-block edits should implement the same persisted-draft comparison behavior
- Create mode should also lock navigation once the user has started a draft that is no longer pristine.
- Unlock navigation immediately after save, delete, or explicit close/reset of a non-onboarding draft.

### Translation and copy additions

- Add translation keys for the usage-time flow in both languages, covering:
  - form labels
  - placeholders
  - validation errors
  - card summary labels
  - onboarding empty state copy
  - save/delete/close labels
  - dirty reminder copy if the usage flow uses separate wording from schedule
- Reuse existing generic validation keys where wording already matches.
- Keep translation ownership inside module UI rather than pushing resolved strings down from onboarding containers.

## Delivery Sequence

1. Add the usage-block domain types and repository with repository tests.
2. Extract or move the popular-sites selector into `src/components` and keep schedule working against the shared version.
3. Build usage-form services, validation, presets, and module-local views/components.
4. Implement the reusable `UsageBlockContainer` with onboarding and normal-view branching.
5. Refactor onboarding step two so schedule and usage containers both report persisted-state validity and dirty-lock state.
6. Update the onboarding stepper/navigation hook to enforce the new unsaved-change lock behavior.
7. Finish translation coverage and focused UI tests.

## Test Plan

- Add repository coverage for usage-block persistence, updates, and deletion.
- Add unit tests for usage-form validation, draft normalization, and dirty-equality helpers.
- Add component tests for the reusable usage form and usage container covering:
  - onboarding empty state
  - onboarding existing-block expanded state
  - max-one behavior
  - non-onboarding collapse/expand behavior
  - delete visibility differences between onboarding and normal mode
  - website normalization and invalid-domain rejection
- Update onboarding step-two tests to cover:
  - step-three unlock when only schedule exists
  - step-three unlock when only usage exists
  - step-three unlock when both exist
  - step-three locked when neither exists
  - navigation locking while schedule edit draft is dirty
  - navigation locking while usage create/edit draft is dirty
- Update onboarding flow tests so stepper click navigation is blocked during unsaved changes and restored after saving.

## Assumptions

- Onboarding step two should allow the user to create either block type, not require the currently selected type specifically, as long as at least one persisted schedule or usage block exists.
- The reusable usage module should follow the same architecture and visual language as the schedule module rather than inventing a separate interaction model.
- If the current delete confirmation modal is too schedule-specific, creating a generic shared confirmation modal is acceptable only if it improves both modules without broadening the API unnecessarily.
