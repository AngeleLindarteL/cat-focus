import type { UseTranslationResult } from "@/lib/i18n";
import type {
  DeveloperToolsActionId,
  DeveloperToolsVisibilityControlId,
} from "@/modules/options-developer-tools/views/OptionsDeveloperToolsView/constants";

export type OptionsDeveloperToolsViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  isOpen: boolean;
  pendingActionId: DeveloperToolsActionId | null;
  pendingVisibilityControlId: DeveloperToolsVisibilityControlId | null;
  feedbackMessage: string;
  isError: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSkipOnboarding: () => void;
  onResetOnboarding: () => void;
  onClearUsageBlocks: () => void;
  onClearScheduleBlocks: () => void;
};
