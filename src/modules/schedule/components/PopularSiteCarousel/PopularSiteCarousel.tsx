import type { PopularSiteCarouselProps } from "@/modules/schedule/components/PopularSiteCarousel/interfaces";

export function PopularSiteCarousel({
  title,
  items,
  onSelect,
}: PopularSiteCarouselProps) {
  return (
    <section className="space-y-3">
      <p className="text-sm font-medium text-stone-800">{title}</p>
      <div className="overflow-x-auto overflow-y-visible px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-flow-col auto-cols-[clamp(3.75rem,18vw,4.75rem)] gap-3 py-1 lg:auto-cols-[clamp(4rem,10vw,5rem)]">
          {items.map((item) => (
            <div key={item.id} className="flex snap-start justify-center">
              <button
                type="button"
                title={item.name}
                aria-label={item.name}
                aria-pressed={item.isSelected}
                onClick={() => {
                  onSelect(item);
                }}
                className="relative z-0 flex cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white text-stone-900 transition hover:z-10 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 aria-pressed:border-amber-300 aria-pressed:bg-amber-100 aria-pressed:text-stone-900 disabled:cursor-not-allowed"
                style={{
                  width: "clamp(3rem, 14vw, 4.25rem)",
                  height: "clamp(3rem, 14vw, 4.25rem)",
                  minWidth: "30px",
                  maxWidth: "24rem",
                }}
              >
                <img
                  src={item.iconSrc}
                  alt=""
                  className="h-5 w-5 select-none sm:h-6 sm:w-6"
                />
                <span className="sr-only">{item.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
