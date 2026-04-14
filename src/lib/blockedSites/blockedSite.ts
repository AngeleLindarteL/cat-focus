import { POPULAR_SITE_PRESETS } from "@/lib/blockedSites/blockedSite.constants";
import type {
  BlockedSite,
  PopularSitePreset,
  PopularSitePresetItem,
} from "@/lib/blockedSites/blockedSite.interfaces";

export function normalizeBlockedSiteDomain(value: string): string {
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

export function validateBlockedSiteDomain(value: string): boolean {
  try {
    const normalizedDomain = normalizeBlockedSiteDomain(value);
    return /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(normalizedDomain);
  } catch {
    return false;
  }
}

export function findBlockedSiteIndexByDomain(
  sites: BlockedSite[],
  domain: string,
): number {
  const normalizedDomain = normalizeBlockedSiteDomain(domain);

  return sites.findIndex(
    (site) => normalizeBlockedSiteDomain(site.domain) === normalizedDomain,
  );
}

export function createPopularSitePresetItems(
  sites: BlockedSite[],
): PopularSitePresetItem[] {
  const selectedDomains = new Set(
    sites.map((site) => normalizeBlockedSiteDomain(site.domain)),
  );

  return POPULAR_SITE_PRESETS.map((preset) => ({
    ...preset,
    isSelected: selectedDomains.has(
      normalizeBlockedSiteDomain(preset.domain),
    ),
  }));
}

export function togglePopularSitePreset(
  sites: BlockedSite[],
  preset: Pick<PopularSitePreset, "name" | "domain">,
): BlockedSite[] {
  const existingIndex = findBlockedSiteIndexByDomain(sites, preset.domain);

  if (existingIndex >= 0) {
    return sites.filter((_, index) => index !== existingIndex);
  }

  return [
    ...sites,
    {
      name: preset.name,
      domain: normalizeBlockedSiteDomain(preset.domain),
    },
  ];
}

export function isPopularSitePresetSite(site: BlockedSite): boolean {
  return findBlockedSiteIndexByDomain(POPULAR_SITE_PRESETS, site.domain) >= 0;
}
