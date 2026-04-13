# AGENTS.md

## Scope

Persistence abstractions for storage-backed app state.

## Rules

- Repositories are the source of truth for storage access patterns.
- Each repository must split responsibilities into:

```text
featureRepository.ts
featureRepository.interfaces.ts
featureRepository.constants.ts
```

- The implementation file owns read/write behavior.
- `*.interfaces.ts` owns repository contracts and storage shapes.
- `*.constants.ts` owns storage key collections, defaults, and static repository config.
- UI containers may depend on repositories, but views must not.
- If a persisted state slice does not clearly belong to an existing repository, create a new repository instead of overloading another one.
