import type { BlockedSite } from "@/lib/blockedSites";

export type ScheduleSitePreset = BlockedSite & {
  id: string;
  iconSrc: string;
};

export type ScheduleSitePresetItem = ScheduleSitePreset & {
  isSelected: boolean;
};
