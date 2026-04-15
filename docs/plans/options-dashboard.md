# Options Dashboard

## Summary

Replace the post-onboarding options home placeholder with a real dashboard shell that keeps the Cat Focus floating-card visual language while exposing four sections: cat editing, usage limits, schedule limits, and user preferences.

## Implementation

- Add a new `src/modules/options-dashboard` module to own the hash-based section navigation, floating dashboard shell, and section orchestration.
- Keep `src/options/App.tsx` thin by continuing to route through `OptionsGateContainer`; change only the finished-onboarding branch to render the new dashboard container.
- Reuse the existing standalone schedule, usage, and user-preferences containers.
- Add a standalone cat editor container that reuses the existing cat form hook and view without mutating onboarding progress state.
- Canonicalize dashboard navigation through URL hashes:
  - `#your-cat`
  - `#usage-time-limits`
  - `#schedule-limits`
  - `#preferences`

## Tests

- Cover hash parsing and fallback behavior.
- Cover sidebar-driven section switching and active-state tracking.
- Cover standalone cat editing persistence.
- Cover standalone preferences loading and saving.

## Notes

- The sidebar is on the left.
- The outer shell remains centered and capped to roughly 90% of the viewport width to preserve the floating-card framing.
