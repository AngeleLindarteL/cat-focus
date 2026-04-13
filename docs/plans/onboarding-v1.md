# Onboarding V1: repository-backed flow, popup/options gating, cat setup, i18n

## Summary

Implement a storage-backed onboarding flow for new installs using `chrome.storage.local` only, but wrap persistence behind a repository pattern instead of calling Chrome storage directly from containers. Add Chrome i18n with English and Spanish locale packs, gate both popup and options on onboarding completion, and build the first onboarding step around a cat profile form with live preview, validation, sanitization, and persisted resume behavior.

## Implementation Changes

- Add two storage repositories under `src/lib`:
  - `CatRepository` for cat profile data
  - `OnboardingRepository` for onboarding progress state
- Keep Chrome API access isolated inside repository and small Chrome wrapper layers; views remain presentation-only.

- `CatRepository` responsibilities:
  - persist and load `{ name, furColorPrimary, furColorSecondary }`
  - expose typed async methods for read/write
  - return persisted data for form prefilling when onboarding resumes or when the user revisits a previous step

- `OnboardingRepository` responsibilities:
  - persist and load `onboarding-step` and `onboarding-finished`
  - own the stepper state exposed to the UI
  - define default onboarding state for new installs:
    - treat missing / `0` / `null` / `undefined` `onboarding-step` as unstarted onboarding
    - normalize to active step `1`
    - default `onboarding-finished` to `false`
  - update step progression after successful step submissions
  - mark completion with `onboarding-step = 3` and `onboarding-finished = true`

- Popup behavior:
  - if onboarding is incomplete, render a compact onboarding redirect card in the popup using the Cat Focus design system
  - title: localized “Hello! Thanks for installing our extension”
  - improved subtitle:
    - English: `We’ll help you set up your focus companion and preferences.`
    - Spanish: `Te ayudaremos a configurar tu compañero de enfoque y tus preferencias.`
  - primary action opens the options page
  - if onboarding is finished, render the normal popup home container

- Options behavior:
  - keep `src/options/App.tsx` thin
  - render `OnboardingContainer` while onboarding is incomplete
  - render the default options container when onboarding is finished

- Onboarding module:
  - add `src/modules/onboarding` with `containers`, `hooks`, `services`, `types`, and `views`
  - `OnboardingContainer` loads repository state, resolves the active step, renders the stepper, handles navigation between steps, and wires form submission/persistence
  - the onboarding repo determines the active step shown in the stepper
  - the user can leave onboarding and return later; when reopening, the UI loads the persisted step from `OnboardingRepository`
  - if the loaded step was previously completed or revisited, fetch persisted configuration data and prefill the form so the user can confirm or edit it
  - support navigating back to previous steps; revisits must reload persisted data rather than relying on transient component state

- Shared stepper:
  - add a dumb shared stepper component
  - props:
    - `steps: Array<{ key: string; label: string }>`
    - `actualStep: string (valueof steps[key])`
  - circles show the step number
  - current and previous steps are highlighted
  - labels use matching active/inactive colors
  - styling follows the existing Cat Focus popup/options visual language

- Cat generator and step 1:
  - convert `samples/cat-generation.html` into a reusable React cat renderer plus a hook-driven subcontainer
  - split responsibilities:
    - shared cat renderer: presentational only, receives colors as props
    - cat generator subcontainer/hook: manages color selection and derived preview state
    - first-step subcontainer: owns the form
  - step 1 form fields:
    - `name`
    - `furColorPrimary`
    - `furColorSecondary`
  - use `react-hook-form` with Zod validation through `@hookform/resolvers/zod`
  - sanitize cat name before validation/persistence:
    - trim outer whitespace
    - collapse repeated internal whitespace
  - validation rules:
    - name required after sanitization
    - both colors required
    - both colors must be valid hex color strings
  - UX rules:
    - show localized inline validation errors
    - block invalid submit
    - re-render cat preview immediately when color inputs change
  - step 1 submit behavior:
    - save cat data through `CatRepository`
    - update onboarding progress through `OnboardingRepository`

- Later onboarding steps:
  - keep the 3-step onboarding contract
  - steps 2 and 3 may use lightweight placeholder content in v1, but they must still participate in repo-driven navigation and stepper state
  - final completion sets `onboarding-finished = true`

- I18n:
  - add Chrome i18n setup to the manifest
  - ship `_locales/en/messages.json` and `_locales/es/messages.json`
  - all onboarding, popup, options, step labels, CTA labels, and validation copy must come from i18n keys
  - unsupported locales fall back to English

- Design system:
  - use the `cat-focus-design-system` skill guidance as the visual source of truth
  - preserve the warm gradient background, white elevated card, stone text, amber eyebrow accents, large radii, and single primary action pattern
  - keep popup/options entrypoints thin and container-driven

## Public Interfaces and Types

- `type OnboardingStep = 1 | 2 | 3`
- `type OnboardingState = { step: OnboardingStep; finished: boolean }`
- `type CatProfile = { name: string; furColorPrimary: string; furColorSecondary: string }`

- `CatRepository`
  - `getCatProfile(): Promise<CatProfile | null>`
  - `saveCatProfile(profile: CatProfile): Promise<void>`

- `OnboardingRepository`
  - `getOnboardingState(): Promise<OnboardingState>`
  - `setActiveStep(step: OnboardingStep): Promise<void>`
  - `finishOnboarding(): Promise<void>`

- Stepper props
  - `{ steps: Array<{ key: "1" | "2" | "3"; label: string }>; actualStep: "1" | "2" | "3" }`

- Zod schema
  - single source of truth for step 1 form validation and persisted cat profile shape

## Packages and Install Commands

Required runtime packages:

- `react-hook-form`
- `zod`
- `@hookform/resolvers`

Required test packages:

- `vitest`
- `jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`

Install commands for this repo:

```bash
pnpm add react-hook-form zod @hookform/resolvers
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

If you want the commands in repo convention form:

```bash
rtk pnpm add react-hook-form zod @hookform/resolvers
rtk pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

## Test Plan

- Repository tests:
  - onboarding repo returns default state for missing/`0`/`null`/`undefined` onboarding values
  - onboarding repo persists and reloads step/finished state correctly
  - cat repo saves and reloads cat profile correctly

- Gating tests:
  - popup renders onboarding redirect when unfinished
  - popup renders normal home when finished
  - options renders onboarding container when unfinished
  - options renders default container when finished

- Form/schema tests:
  - empty name fails
  - whitespace-only name fails after sanitization
  - repeated spaces collapse before persistence
  - invalid colors fail
  - valid values save through the repository

- Component tests:
  - stepper highlights current and previous steps correctly
  - cat preview updates when either fur color changes
  - step 1 shows localized validation errors
  - successful step 1 submit saves cat data and advances onboarding state
  - revisiting a completed step reloads and prefills saved data

- I18n checks:
  - English strings resolve by default
  - Spanish strings resolve for onboarding and validation copy

## Assumptions

- `chrome.storage.local` is the only storage scope used in v1.
- English and Spanish are the only shipped locales for now.
- The onboarding repository is the source of truth for active step state.
- Users may leave and resume onboarding; reopening should load the persisted step and prefill saved data for any revisited form.
- Steps 2 and 3 can be lightweight placeholders in v1, but they must follow the same repository-driven flow.
- This merged plan replaces the previous onboarding drafts.
