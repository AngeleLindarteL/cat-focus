import type { UseTranslationResult } from "@/lib/i18n";
import type { DeveloperToolsActionId } from "@/modules/options-developer-tools/views/OptionsDeveloperToolsView/constants";

export type OptionsDeveloperToolsViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  pendingActionId: DeveloperToolsActionId | null;
  feedbackMessage: string;
  isError: boolean;
  onSkipOnboarding: () => void;
  onResetOnboarding: () => void;
  onClearUsageBlocks: () => void;
  onClearScheduleBlocks: () => void;
};
