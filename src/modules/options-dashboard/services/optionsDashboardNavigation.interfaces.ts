export type OptionsDashboardSectionId =
  | "your-cat"
  | "usage-time-limits"
  | "schedule-limits"
  | "preferences";

export type OptionsDashboardSectionDefinition = {
  id: OptionsDashboardSectionId;
  hash: `#${OptionsDashboardSectionId}`;
};
