# Cat Focus Design System Reference

## Source of truth

- `src/components/SurfaceCard.tsx`
- `src/modules/home/views/HomeView.tsx`

Use those files as canonical implementation references when this document and the code ever diverge.

## Visual direction

The Cat Focus UI is warm, soft, and compact. It avoids generic dashboard styling and instead uses:

- stone neutrals for most structure and text
- amber as the small accent color
- white elevated cards over a warm atmospheric background
- oversized rounding with low visual noise
- one obvious primary action per surface

## Color tokens

Use these existing Tailwind colors and effects as the baseline palette:

- page text: `text-stone-900`
- support text: `text-stone-600`
- quiet footer text: `text-stone-500`
- card background: `bg-white`
- muted body panel: `bg-stone-100`
- card border: `border-stone-200`
- primary button: `bg-stone-900`
- primary button hover: `hover:bg-stone-700`
- button text: `text-stone-50`
- eyebrow/accent text: `text-amber-700`
- page background:
  - `radial-gradient(circle at top, rgba(251,191,36,0.22), transparent 35%)`
  - `linear-gradient(180deg, #fef7ed 0%, #fff7ed 45%, #fafaf9 100%)`
- card shadow: `shadow-[0_20px_60px_rgba(28,25,23,0.12)]`

## Spacing and sizing

Use the current rhythm unless the layout genuinely needs a change:

- page padding: `px-4 py-6`
- card padding: `p-6`
- card min width: `min-w-80`
- section gaps inside card: `mt-3`, `mt-6`
- stacked content rhythm: `space-y-4`
- body callout padding: `px-4 py-3`
- button padding: `px-4 py-3`

If a surface expands, keep the same cadence rather than inventing tighter or looser spacing.

## Shape and typography

- outer card radius: `rounded-3xl`
- inner panel radius: `rounded-2xl`
- button radius: `rounded-2xl`
- eyebrow:
  - `text-xs`
  - `font-semibold`
  - `uppercase`
  - `tracking-[0.3em]`
- title:
  - `text-3xl`
  - `font-semibold`
  - `tracking-tight`
- body/support copy:
  - `text-sm`
  - `leading-6`
- footer copy:
  - `text-xs`
  - `leading-5`

Do not switch to loud display typography or tighter leading without an explicit product reason.

## Layout pattern

Compose most Cat Focus extension surfaces like this:

1. Full-surface wrapper with centered layout and atmospheric warm background.
2. Single elevated card for the main task.
3. Small eyebrow label for context.
4. Strong title with one-paragraph explanation.
5. Optional muted inset panel for supporting body copy.
6. One full-width primary action when the surface needs a next step.
7. Quiet footer note for architectural or product context.

This pattern is appropriate for popup and options home states. Reuse it for empty states and lightweight settings intros.

## Interaction rules

- Prefer one primary action over multiple competing CTAs.
- Keep buttons full-width inside compact extension cards.
- Use hover lightening, not dramatic animation.
- Preserve readability and calm hierarchy over novelty.

## Do not do

- Do not introduce purple gradients, glassmorphism, neon accents, or dark mode by default.
- Do not use generic blue primary buttons unless the user explicitly asks for a different palette.
- Do not flatten the card into a plain page without the elevated shell.
- Do not spread content edge to edge; keep the compact centered composition.
- Do not move Chrome API calls into presentational components.
