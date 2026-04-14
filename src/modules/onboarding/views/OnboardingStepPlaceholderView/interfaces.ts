import type { UseTranslationResult } from "@/lib/i18n";

export type OnboardingStepPlaceholderViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  note: string;
  onPreviousAction?: () => void;
  onNextAction: () => void;
};
