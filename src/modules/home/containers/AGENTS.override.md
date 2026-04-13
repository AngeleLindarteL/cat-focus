# AGENTS.override.md

## Scope

Containers for the default home module.

## Rules

- Containers may orchestrate navigation, message access, and calls into Chrome wrappers or repositories.
- Keep these files focused on screen/surface composition, not large chunks of markup.
- Delegate all substantial markup to views.
- If a container grows a distinct stateful subsection, split it into a subcontainer.
