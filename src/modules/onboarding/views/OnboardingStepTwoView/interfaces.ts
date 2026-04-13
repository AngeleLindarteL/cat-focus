import type { ReactNode } from "react";
import type { BlockTypeOption } from "@/components/BlockTypeSelector";
import type { StepTwoBlockType } from "@/modules/onboarding/containers/OnboardingStepTwoContainer";

export type OnboardingStepTwoViewProps = {
  title: string;
  description: string;
  value: StepTwoBlockType;
  options: BlockTypeOption<StepTwoBlockType>[];
  previousActionLabel: string;
  nextActionLabel: string;
  onValueChange: (value: StepTwoBlockType) => void;
  onPreviousAction: () => void;
  onNextAction: () => void;
  children: ReactNode;
};
