import type { SurfaceCardProps } from "@/components/SurfaceCard/interfaces";

export function SurfaceCard({
  eyebrow,
  title,
  description,
  footer,
  headerAccessory,
  children,
}: SurfaceCardProps) {
  return (
    <section className="mx-auto max-w-5xl rounded-[32px] border border-stone-200/80 bg-white px-6 py-6 shadow-[0_24px_80px_rgba(120,113,108,0.12)] sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600">
            {eyebrow}
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-stone-600">{description}</p>
          </div>
        </div>
        {headerAccessory}
      </div>
      <div className="mt-6">{children}</div>
      {footer ? <div className="mt-6">{footer}</div> : null}
    </section>
  );
}
