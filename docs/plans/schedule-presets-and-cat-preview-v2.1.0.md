# Schedule Presets And Cat Preview V2.1.0

## Summary

Capture the implemented `v2.1.0` iteration that added preset-site shortcuts to the schedule block flow and improved onboarding step 1 cat feedback. This iteration is already implemented and serves as the baseline for the next follow-up changes.

## Implemented Changes

- Added a preset-site carousel to the schedule block form for:
  - Instagram
  - Facebook
  - Reddit
  - X
  - Amazon
  - YouTube
  - TikTok
  - Netflix
- Backed the preset list with schedule-local constants and local SVG icons.
- Wired preset selection into the schedule form so selecting a preset appends the corresponding blocked site and clears site validation errors.
- Added a translatable schedule form label:
  - `Add from popular sites`
- Added schedule preset tests covering:
  - preset selection state
  - duplicate-prevention for preset clicks
  - translated title rendering
  - accessible preset buttons

- Fixed the onboarding step 1 stale cat-profile reload bug by refreshing the saved cat profile after submit.
- Added a live cat-name preview above the pixel cat in onboarding step 1.
- Styled the preview name as a bold black pixel-style label.
- Added onboarding regression tests covering:
  - cat profile reload after submit
  - real-time cat-name preview updates

## Notes

- In this iteration, `PopularSiteCarousel` was introduced under `src/modules/schedule/views`, but follow-up `v2.1.1` will correct that structure and treat it as a module component.
- This iteration is the baseline for the next refinement pass; behavior and structure changes requested afterward are intentionally excluded from this file.

