export const DEVELOPER_TOOLS_ACTIONS = {
  skipOnboarding: "skip-onboarding",
  resetOnboarding: "reset-onboarding",
  clearUsageBlocks: "clear-usage-blocks",
  clearScheduleBlocks: "clear-schedule-blocks",
} as const;

export type DeveloperToolsActionId =
  (typeof DEVELOPER_TOOLS_ACTIONS)[keyof typeof DEVELOPER_TOOLS_ACTIONS];
