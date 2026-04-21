import type {
  OptionsDashboardSectionDefinition,
  OptionsDashboardSectionId,
} from "@/modules/options-dashboard/services/optionsDashboardNavigation.interfaces";

export const DEFAULT_OPTIONS_DASHBOARD_SECTION_ID: OptionsDashboardSectionId =
  "your-cat";

export const OPTIONS_DASHBOARD_SECTIONS: OptionsDashboardSectionDefinition[] = [
  {
    id: "your-cat",
    hash: "#your-cat",
  },
  {
    id: "new-cat",
    hash: "#new-cat",
  },
  {
    id: "usage-time-limits",
    hash: "#usage-time-limits",
  },
  {
    id: "schedule-limits",
    hash: "#schedule-limits",
  },
  {
    id: "preferences",
    hash: "#preferences",
  },
];
