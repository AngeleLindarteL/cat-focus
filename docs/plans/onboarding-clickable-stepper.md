# Clickable Onboarding Stepper

## Summary

Add optional click behavior to the shared `Stepper` so a step circle can execute step-specific navigation when provided. For onboarding, make direct step jumps available only when the same validation rules used by the back/next flow allow the user to reach that step.

## Implementation Changes

- Extend the shared stepper item contract with an optional `onClick` callback.
- Keep `src/components/Stepper` presentational: it only decides whether to render a step circle as interactive and applies the hover affordance for clickable steps.
- Add an onboarding hook that owns:
  - `canUserGoToStep(step)`
  - direct step navigation
  - previous/next navigation callbacks
  - step item derivation with conditional `onClick`
- Refactor onboarding flow orchestration so step-two completion state is surfaced to the parent container and reused for both:
  - the `Next` button disabled state
  - stepper click eligibility for step three

## Interaction Rules

- Step 1 is always reachable.
- Step 2 is reachable only after the onboarding state has already advanced past step 1.
- Step 3 is reachable only when step-two validation passes.
- Clicking an unreachable step must do nothing because no `onClick` is assigned.
- Clickable step circles should show pointer cursor, brighter amber shadow, and a slight lift on hover.

## Test Plan

- Update shared stepper tests to cover clickable and non-clickable circle rendering plus callback execution.
- Add onboarding flow coverage for:
  - returning to a reachable prior step from the stepper
  - keeping step 3 locked before step-two validation passes
  - unlocking direct navigation to step 3 after validation passes
- Preserve and adapt step-two tests so the same completion signal drives both navigation and button state.

## Assumptions

- Only the numbered step circle is clickable, not the label.
- The shared stepper remains generic and does not contain onboarding-specific rules.
- Hover styling must stay within the existing Cat Focus amber/stone design language.
