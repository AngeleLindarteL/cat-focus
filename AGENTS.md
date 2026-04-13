# AGENTS.md

## Project Context

This repository is a Chrome extension built with:

- Vite
- `@crxjs/vite-plugin`
- React 19
- TypeScript
- Tailwind CSS v4

Treat this as a browser-extension codebase first, not a generic SPA. Keep extension boundaries explicit: popup UI, content scripts, options pages, and shared libraries should stay clearly separated.

## Working Structure

Use this structure as the default architecture for new work:

```text
src/
  components/   # Shared/common reusable UI components
  content/      # Content scripts that run in web pages
  popup/        # Popup entrypoint
  options/      # Options entrypoint
  modules/      # Feature/module bundles: containers, hooks, services, views
  lib/          # Shared utilities, browser abstractions, domain logic
tests/          # Unit tests
```

Inside `src/modules`, organize code by module context rather than by technical layer at the repo root. A typical module may contain:

```text
src/modules/<module-name>/
  containers/
  hooks/
  services/
  views/
  types/
```

Additional extension surfaces like `sidepanel/` or future background/service-worker code are allowed when needed, but should follow the same separation rules:

- keep entrypoints thin
- keep reusable shared UI in `src/components`
- keep module-specific code inside `src/modules/<module-name>`
- move cross-module infrastructure into `src/lib`

If the current file tree does not fully match this target yet, prefer moving the codebase toward this structure as changes are made.

## Source Of Truth

- `src/content`: code that touches the host page DOM, selection state, observers, page messaging, or injected UX
- `src/popup` and `src/options`: thin render entrypoints that mount app containers
- `src/components`: shared/common React components used across modules and extension surfaces
- `src/modules`: module-owned containers, hooks, services, views, and related types
- `src/lib`: pure utilities, storage clients, Chrome API wrappers, shared types, validators, and cross-module business logic
- `tests`: unit tests for `src/lib`, module hooks/services, reducers, and isolated component behavior

Do not put page-side DOM logic inside shared React components. Do not put Chrome API calls directly into many scattered UI files when a wrapper in `src/lib` or a module service would keep behavior testable.

## Container/View Pattern

Enforce the container/view pattern for renderable UI surfaces.

- `App.tsx` files for popup, options, sidepanel, or similar renderable surfaces should compose containers, not own feature logic directly
- containers handle orchestration: data loading, side effects, state wiring, service calls, and event handlers
- views are presentational and should receive data and callbacks through props
- subcontainers are allowed when a screen has distinct stateful regions
- shared presentational pieces belong in `src/components`
- module-specific presentational pieces belong in that module's `views/`

Use this bias:

1. entrypoint `App.tsx`
2. top-level container
3. subcontainers as needed
4. presentational views and shared components beneath them

Avoid turning `App.tsx` into a mixed container/view file.

### Container/View Enforcement Rule

Use this rule whenever creating or reviewing renderable feature UI:

- entrypoints render containers only
- containers may import hooks, services, repositories, Chrome wrappers, and views
- views may import shared components and view-local helpers, but must not import repositories, storage clients, Chrome APIs, or page-side DOM logic
- views receive plain props and callbacks, not raw storage responses or Chrome payloads
- if a component both orchestrates data and renders substantial markup, split it into a container plus a view
- if a form needs persistence or side effects, keep submission/loading/state orchestration in the container and keep field markup in the view
- subcontainers are allowed for distinct stateful regions, but they should still delegate markup-heavy rendering to views

Default render chain:

1. `App.tsx`
2. screen/container
3. subcontainer if needed
4. view
5. shared component

If a new UI does not fit this chain, document why before introducing the exception.

## Component Bundling Rule

When creating a React component, bundle it in its own folder instead of a single loose file.

Default structure:

```text
ComponentName/
  ComponentName.tsx
  index.ts
  interfaces.ts
  constants.ts
  useComponentName.ts
```

Apply these rules:

- every React component gets its own folder
- `index.ts` is the barrel export for the component and its public types/hooks
- `interfaces.ts` holds the component props and related local types
- `constants.ts` holds local constants, static config, class-name constants, and other non-derived values
- add `useComponentName.ts` only when the component has reusable or non-trivial hook logic
- if the component has no hook, omit the hook file rather than adding an empty one
- keep component-local helpers inside the component folder unless they are reused elsewhere
- prefer imports through the component folder barrel, not deep relative imports into sibling internals

This is the default rule for shared components, module views, and other React UI components.

## Logical/Backend Bundling Rule

When creating non-UI logic such as repositories, storage adapters, validators, content logic, or other app-backend modules, split responsibilities into focused files rather than combining constants, contracts, and implementation in one file.

Default pattern:

```text
someFeature.ts
someFeature.interfaces.ts
someFeature.constants.ts
```

Apply these rules:

- implementation stays in the main file
- contracts, interfaces, and storage shapes go in `*.interfaces.ts`
- constants, keys, defaults, and static config go in `*.constants.ts`
- if the logic also has pure helpers or transformers, give them explicit feature-scoped filenames instead of burying them in the implementation file
- use this rule for `src/lib`, storage/repository code, and content-side logic by default
- avoid “utils” dumping grounds; name files after the actual responsibility

When deciding between component bundling and logical/backend bundling:

- React-rendered units use the component folder rule
- repositories, Chrome wrappers, storage clients, validators, and content/business logic use the logical/backend rule

## React Standards

Use modern React with disciplined state ownership:

- keep state as local as possible
- derive values instead of duplicating them in state
- lift state only when multiple siblings truly need shared ownership
- prefer controlled data flow over ad hoc mutable module state
- avoid unnecessary `useEffect`; if something can be computed during render, do that
- use effects for synchronization with external systems only
- clean up every listener, observer, interval, timeout, and subscription
- keep components focused; split large components before they become stateful catch-alls
- prefer custom hooks when logic is reusable or side-effect-heavy
- prefer containers for behavior and views for presentation
- keep presentational views free from storage, Chrome API, and page-side concerns
- pass normalized props to views instead of leaking service response shapes deep into the tree

## State And Memory Practices

Optimize for predictable behavior and low extension overhead:

- minimize long-lived in-memory state, especially in content scripts
- avoid retaining DOM nodes, large arrays, or observers longer than needed
- disconnect `MutationObserver`, `ResizeObserver`, and event listeners immediately on cleanup
- debounce or batch expensive page reactions
- store persistent user settings in a dedicated storage abstraction under `src/lib`
- keep transient UI state in component state; keep persisted settings in storage-backed state
- prefer immutable updates and stable data shapes
- do not introduce global stores by default; use them only when local state and composition stop scaling

When choosing state placement, use this order by default:

1. derived value in render
2. local component state
3. custom hook shared by a feature surface
4. narrow shared context
5. external/global store only if clearly justified

## Chrome Extension Guidelines

- assume Manifest V3 constraints
- isolate Chrome extension APIs behind small wrappers in `src/lib`
- validate message payloads and storage reads
- prefer typed message contracts for communication across popup/content/options/background surfaces
- do not block the main thread in content scripts
- be careful with host-page CSS and DOM collisions; scope injected UI deliberately
- avoid leaking listeners across page navigations or reinjections

## TypeScript And Code Quality

- prefer explicit types on exported functions, public hooks, and Chrome-facing APIs
- keep `src/lib` as framework-light as possible
- avoid `any`; if unavoidable, isolate it at the boundary and narrow immediately
- use the `@/` alias for imports from `src`
- keep files cohesive; if a file mixes UI, storage, and DOM integration, split it
- prefer module-local types unless they are intentionally shared across modules

## Testing Expectations

Add or update tests when changing:

- shared utilities in `src/lib`
- stateful hooks
- reducers or data transformation logic
- message protocol helpers
- non-trivial component behavior

Favor fast unit tests over brittle end-to-end coverage unless the task specifically requires integration testing.

## Plans And Specs

Store development plans and feature specs in `docs/plans/`.

- create one document per feature or scoped piece of work
- use a short descriptive filename that reflects the feature being implemented
- prefer names like `focus-session-timer.md`, `site-blocking-rules.md`, or `popup-settings-flow.md`
- keep plans/specs updated when implementation decisions materially change

Do not leave planning artifacts scattered across the repo root or inside feature folders when they are intended to guide implementation work.

## Commands

Prefix shell commands with `rtk` in this repository.

Common commands:

- `rtk npm run dev`
- `rtk npm run build`
- `rtk npm run lint`

## Agent Behavior

When making changes here:

- preserve the separation between extension surfaces
- keep `App.tsx` files thin and container-driven
- move reusable logic out of entrypoint files
- keep module logic bundled inside `src/modules`
- improve architecture incrementally instead of widening existing shortcuts
- avoid speculative abstractions
- keep user-facing behavior stable unless the task requires a change
- mention missing tests or architectural gaps when they matter
