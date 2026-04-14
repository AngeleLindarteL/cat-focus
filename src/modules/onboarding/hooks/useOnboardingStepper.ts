import { useCallback, useMemo } from "react";
import { TranslationKey } from "@/lib/i18n";
import type { OnboardingStep } from "@/lib/onboarding";
import type {
  UseOnboardingStepperParams,
  UseOnboardingStepperResult,
} from "@/modules/onboarding/hooks/useOnboardingStepper.interfaces";

export function useOnboardingStepper({
  currentStep,
  canContinueToStepThree,
  hasBlockingUnsavedChanges,
  getTranslation,
  onStepChange,
  onFinish,
}: UseOnboardingStepperParams): UseOnboardingStepperResult {
  const canUserGoToStep = useCallback(
    (step: OnboardingStep) => {
      if (currentStep === 2 && hasBlockingUnsavedChanges) {
        return step === 2;
      }

      if (step === 1) {
        return true;
      }

      if (step === 2) {
        return currentStep >= 2;
      }

      if (step === 3) {
        return currentStep >= 3 || (currentStep >= 2 && canContinueToStepThree);
      }

      return false;
    },
    [canContinueToStepThree, currentStep, hasBlockingUnsavedChanges],
  );

  const goToStep = useCallback(
    async (step: OnboardingStep) => {
      if (!canUserGoToStep(step) || step === currentStep) {
        return;
      }

      await onStepChange(step);
    },
    [canUserGoToStep, currentStep, onStepChange],
  );

  const goPrevious = useCallback(async () => {
    if (currentStep === 2 && hasBlockingUnsavedChanges) {
      return;
    }

    if (currentStep === 2) {
      await onStepChange(1);
      return;
    }

    if (currentStep === 3) {
      await onStepChange(2);
    }
  }, [currentStep, hasBlockingUnsavedChanges, onStepChange]);

  const goNext = useCallback(async () => {
    if (currentStep === 2 && hasBlockingUnsavedChanges) {
      return;
    }

    if (currentStep === 2) {
      if (!canContinueToStepThree) {
        return;
      }

      await onStepChange(3);
      return;
    }

    if (currentStep === 3) {
      await onFinish();
    }
  }, [
    canContinueToStepThree,
    currentStep,
    hasBlockingUnsavedChanges,
    onFinish,
    onStepChange,
  ]);

  const steps = useMemo(
    () => [
      {
        key: "1" as const,
        label: getTranslation(TranslationKey.OnboardingStepOneLabel),
        onClick:
          canUserGoToStep(1) && currentStep !== 1
            ? () => {
                void goToStep(1);
              }
            : undefined,
      },
      {
        key: "2" as const,
        label: getTranslation(TranslationKey.OnboardingStepTwoLabel),
        onClick:
          canUserGoToStep(2) && currentStep !== 2
            ? () => {
                void goToStep(2);
              }
            : undefined,
      },
      {
        key: "3" as const,
        label: getTranslation(TranslationKey.OnboardingStepThreeLabel),
        onClick:
          canUserGoToStep(3) && currentStep !== 3
            ? () => {
                void goToStep(3);
              }
            : undefined,
      },
    ],
    [canUserGoToStep, currentStep, getTranslation, goToStep],
  );

  return {
    steps,
    canUserGoToStep,
    goToStep,
    goPrevious,
    goNext,
    isPreviousActionDisabled: currentStep === 2 && hasBlockingUnsavedChanges,
    isNextActionDisabled:
      currentStep === 2 &&
      (!canContinueToStepThree || hasBlockingUnsavedChanges),
  };
}
