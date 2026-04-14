# AGENTS.md

## Scope

This module owns schedule-block containers, services, module-local components, and views.

## Rules

- Keep screen-level and form-level presentational surfaces in `views/`.
- Put smaller reusable schedule-only UI in `components/`.
- Schedule-owned non-reusable views/components must receive `getTranslation` instead of fixed translated copy props.
- Resolve schedule form/modal copy inside the schedule module, and only pass label props into shared reusable components such as inputs/selectors when the shared API needs them.
- Keep schedule-domain normalization and preset comparison rules in schedule services so preset toggles and manual edits share the same behavior.
- All clickable buttons in schedule components and views must include pointer cursor behavior.
