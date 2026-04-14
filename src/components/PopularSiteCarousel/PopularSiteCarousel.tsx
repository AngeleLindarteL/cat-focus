import {
  POPULAR_SITE_CAROUSEL_BUTTON_CLASS_NAME,
  POPULAR_SITE_CAROUSEL_TRACK_CLASS_NAME,
  POPULAR_SITE_CAROUSEL_WRAPPER_CLASS_NAME,
} from "@/components/PopularSiteCarousel/constants";
import type { PopularSiteCarouselProps } from "@/components/PopularSiteCarousel/interfaces";

export function PopularSiteCarousel({
  title,
  items,
  onSelect,
}: PopularSiteCarouselProps) {
  return (
    <section className="space-y-3">
      <p className="text-sm font-medium text-stone-800">{title}</p>
      <div className={POPULAR_SITE_CAROUSEL_WRAPPER_CLASS_NAME}>
        <div className={POPULAR_SITE_CAROUSEL_TRACK_CLASS_NAME}>
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
                className={POPULAR_SITE_CAROUSEL_BUTTON_CLASS_NAME}
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
