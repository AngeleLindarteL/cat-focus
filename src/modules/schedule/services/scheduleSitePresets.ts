import {
  createPopularSitePresetItems,
  findBlockedSiteIndexByDomain,
  isPopularSitePresetSite,
  normalizeBlockedSiteDomain,
  togglePopularSitePreset,
  POPULAR_SITE_PRESETS,
  type BlockedSite,
  type PopularSitePreset,
  type PopularSitePresetItem,
} from "@/lib/blockedSites";

export function normalizeScheduleSiteDomain(value: string): string {
  return normalizeBlockedSiteDomain(value);
}

export function findScheduleSiteIndexByDomain(
  sites: BlockedSite[],
  domain: string,
): number {
  return findBlockedSiteIndexByDomain(sites, domain);
}

export function createScheduleSitePresetItems(
  sites: BlockedSite[],
): PopularSitePresetItem[] {
  return createPopularSitePresetItems(sites);
}

export function toggleScheduleSitePreset(
  sites: BlockedSite[],
  preset: Pick<PopularSitePreset, "name" | "domain">,
): BlockedSite[] {
  return togglePopularSitePreset(sites, preset);
}

export function isPresetBackedScheduleSite(site: BlockedSite): boolean {
  return isPopularSitePresetSite(site);
}

export const POPULAR_SCHEDULE_SITE_PRESETS = POPULAR_SITE_PRESETS;
export type {
  PopularSitePreset as ScheduleSitePreset,
  PopularSitePresetItem as ScheduleSitePresetItem,
};
