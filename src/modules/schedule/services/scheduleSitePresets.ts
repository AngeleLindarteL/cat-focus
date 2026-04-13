import type { BlockedSite } from "@/lib/schedules";
import { POPULAR_SCHEDULE_SITE_PRESETS } from "@/modules/schedule/services/scheduleSitePresets.constants";
import type {
  ScheduleSitePreset,
  ScheduleSitePresetItem,
} from "@/modules/schedule/services/scheduleSitePresets.interfaces";

export function normalizeScheduleSiteDomain(value: string): string {
  const trimmedValue = value.trim().toLowerCase();

  if (!trimmedValue) {
    return "";
  }

  const normalizedUrl = trimmedValue.startsWith("http")
    ? trimmedValue
    : `https://${trimmedValue}`;
  const hostname = new URL(normalizedUrl).hostname.toLowerCase();

  return hostname.replace(/^www\./, "");
}

export function findScheduleSiteIndexByDomain(
  sites: BlockedSite[],
  domain: string,
): number {
  const normalizedDomain = normalizeScheduleSiteDomain(domain);

  return sites.findIndex(
    (site) => normalizeScheduleSiteDomain(site.domain) === normalizedDomain,
  );
}

export function createScheduleSitePresetItems(
  sites: BlockedSite[],
): ScheduleSitePresetItem[] {
  const selectedDomains = new Set(sites.map((site) => normalizeScheduleSiteDomain(site.domain)));

  return POPULAR_SCHEDULE_SITE_PRESETS.map((preset) => ({
    ...preset,
    isSelected: selectedDomains.has(normalizeScheduleSiteDomain(preset.domain)),
  }));
}

export function toggleScheduleSitePreset(
  sites: BlockedSite[],
  preset: Pick<ScheduleSitePreset, "name" | "domain">,
): BlockedSite[] {
  const existingIndex = findScheduleSiteIndexByDomain(sites, preset.domain);

  if (existingIndex >= 0) {
    return sites.filter((_, index) => index !== existingIndex);
  }

  return [
    ...sites,
    {
      name: preset.name,
      domain: normalizeScheduleSiteDomain(preset.domain),
    },
  ];
}

export function isPresetBackedScheduleSite(site: BlockedSite): boolean {
  return (
    findScheduleSiteIndexByDomain(POPULAR_SCHEDULE_SITE_PRESETS, site.domain) >= 0
  );
}

export { POPULAR_SCHEDULE_SITE_PRESETS };
export type { ScheduleSitePreset, ScheduleSitePresetItem };
