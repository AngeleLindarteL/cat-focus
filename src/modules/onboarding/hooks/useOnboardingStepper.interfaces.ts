import type { UseTranslationResult } from "@/lib/i18n";
import type { OnboardingStep } from "@/lib/onboarding";
import type { OnboardingStepItem } from "@/modules/onboarding/types/onboardingView";

export type UseOnboardingStepperParams = {
  currentStep: OnboardingStep;
  canContinueToStepThree: boolean;
  hasBlockingUnsavedChanges: boolean;
  getTranslation: UseTranslationResult["getTranslation"];
  onStepChange: (step: OnboardingStep) => Promise<void>;
  onFinish: () => Promise<void>;
};

export type UseOnboardingStepperResult = {
  steps: OnboardingStepItem[];
  canUserGoToStep: (step: OnboardingStep) => boolean;
  goToStep: (step: OnboardingStep) => Promise<void>;
  goPrevious: () => Promise<void>;
  goNext: () => Promise<void>;
  isPreviousActionDisabled: boolean;
  isNextActionDisabled: boolean;
};
