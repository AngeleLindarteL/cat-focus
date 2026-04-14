# Onboarding V4: profile/preferences step and post-finish celebration

## Summary

- Replace onboarding step 3 placeholder with a reusable user-preferences form module.
- Persist onboarding profile fields (`userName`, `installationReason`) in `user-preferences` storage.
- Keep onboarding at 3 steps and rename the final CTA to "Start your journey".
- After final submit, mark onboarding as finished and show a dedicated congratulations screen before entering options home.

## Implementation Changes

### Reusable profile/preferences module

- Add `src/modules/user-preferences` with:
  - `containers/UserPreferencesFormContainer.tsx`
  - `views/UserPreferencesFormView/*`
  - `services/userPreferencesForm*`
- Support two modes in container contract:
  - `creation`
  - `edition`
- Field schema:
  - `userName` required, min length 3
  - `installationReason` required, min length 3, max length 1000
- Normalize values before persistence:
  - trim outer spaces
  - collapse repeated whitespace

### Persistence and i18n safety

- Extend `UserPreferences` shape in repository contracts:
  - `language?: Language`
  - `userName?: string`
  - `installationReason?: string`
- Add `updatePreferences(patch)` to merge updates without dropping existing fields.
- Update `useTranslation` language setter to use repository patch updates so changing language does not overwrite profile fields.

### Onboarding flow integration

- Replace step 3 placeholder rendering in `OnboardingContainer` with `UserPreferencesFormContainer`.
- Step 3 now renders:
  - title/description for the accountability profile step
  - back action
  - submit action ("Start your journey")
- Submit behavior:
  1. save profile preferences
  2. call `finishOnboarding()`
  3. trigger options gate completion callback

### Post-finish screen

- Add `OnboardingFinishContainer` and `OnboardingFinishView`.
- Render confetti with `@tsparticles/confetti`.
- Render:
  - "Congratulations" title
  - persisted cat preview centered
  - Confucius quote in English
  - button to continue to options home
- Gate behavior in `OptionsGateContainer`:
  - show finish screen only immediately after in-session onboarding completion
  - users already finished from previous sessions continue directly to options home

### Localization

- Add EN/ES keys for:
  - profile step labels and placeholders
  - profile validations
  - final CTA rename
  - finish-screen title, body, quote, and action

## Test Plan

- Repository tests
  - ensure `updatePreferences` merges patch values and preserves unrelated fields.
- Onboarding flow tests
  - verify step three unlock now targets profile step label.
  - verify step-three screen renders profile fields and final CTA.
  - verify successful step-three submit shows finish screen, then routes to options home after CTA.

## Assumptions

- Existing schedule/usage block flows in step 2 stay unchanged in this iteration.
- Finish screen is intentionally transient (in-session) rather than persisted as a separate onboarding state.

