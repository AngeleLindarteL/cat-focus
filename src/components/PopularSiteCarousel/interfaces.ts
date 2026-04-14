import type { PopularSitePresetItem } from "@/lib/blockedSites";

export type PopularSiteCarouselProps = {
  title: string;
  items: PopularSitePresetItem[];
  onSelect: (item: PopularSitePresetItem) => void;
};
