import type { ReactNode } from "react";
import type { BlockTypeOption } from "@/components/BlockTypeSelector";
import type { UseTranslationResult } from "@/lib/i18n";
import type { StepTwoBlockType } from "@/modules/onboarding/containers/OnboardingStepTwoContainer";

export type OnboardingStepTwoViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  value: StepTwoBlockType;
  options: BlockTypeOption<StepTwoBlockType>[];
  isBlockTypeSelectorDisabled?: boolean;
  isPreviousActionDisabled?: boolean;
  isNextActionDisabled?: boolean;
  onValueChange: (value: StepTwoBlockType) => void;
  onPreviousAction: () => void;
  onNextAction: () => void;
  children: ReactNode;
};
