import { useEffect, useRef, useState } from "react";
import type { PopularSiteCarouselProps } from "@/components/PopularSiteCarousel/interfaces";

export function PopularSiteCarousel({
  title,
  items,
  onSelect,
}: PopularSiteCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return undefined;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [items]);

  function scrollBy(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -160 : 160,
      behavior: "smooth",
    });
  }

  return (
    <section className="space-y-3">
      <p className="text-sm font-medium text-stone-800">{title}</p>
      <div className="relative">
        {canScrollLeft ? (
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm transition hover:border-amber-300 hover:bg-amber-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-stone-700"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}

        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-visible px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
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

        {canScrollRight ? (
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm transition hover:border-amber-300 hover:bg-amber-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-stone-700"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </section>
  );
}
