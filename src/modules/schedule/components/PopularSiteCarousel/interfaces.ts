import type { ScheduleSitePresetItem } from "@/modules/schedule/services/scheduleSitePresets";

export type PopularSiteCarouselProps = {
  title: string;
  items: ScheduleSitePresetItem[];
  onSelect: (item: ScheduleSitePresetItem) => void;
};
