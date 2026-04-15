import {
  DEFAULT_OPTIONS_DASHBOARD_SECTION_ID,
  OPTIONS_DASHBOARD_SECTIONS,
} from "@/modules/options-dashboard/services/optionsDashboardNavigation.constants";
import type { OptionsDashboardSectionId } from "@/modules/options-dashboard/services/optionsDashboardNavigation.interfaces";

export function getOptionsDashboardSectionFromHash(
  hash: string,
): OptionsDashboardSectionId {
  const normalizedHash = hash.startsWith("#") ? hash : `#${hash}`;
  const matchingSection = OPTIONS_DASHBOARD_SECTIONS.find(
    (section) => section.hash === normalizedHash,
  );

  return matchingSection?.id ?? DEFAULT_OPTIONS_DASHBOARD_SECTION_ID;
}

export function getOptionsDashboardHash(
  sectionId: OptionsDashboardSectionId,
): `#${OptionsDashboardSectionId}` {
  const matchingSection = OPTIONS_DASHBOARD_SECTIONS.find(
    (section) => section.id === sectionId,
  );

  return matchingSection?.hash ?? `#${DEFAULT_OPTIONS_DASHBOARD_SECTION_ID}`;
}

export {
  DEFAULT_OPTIONS_DASHBOARD_SECTION_ID,
  OPTIONS_DASHBOARD_SECTIONS,
} from "@/modules/options-dashboard/services/optionsDashboardNavigation.constants";
export type {
  OptionsDashboardSectionDefinition,
  OptionsDashboardSectionId,
} from "@/modules/options-dashboard/services/optionsDashboardNavigation.interfaces";
