import { POPULAR_SITE_PRESETS } from "@/lib/blockedSites";
import type { ScheduleSitePreset } from "@/modules/schedule/services/scheduleSitePresets.interfaces";

export const POPULAR_SCHEDULE_SITE_PRESETS =
  POPULAR_SITE_PRESETS satisfies ScheduleSitePreset[];
