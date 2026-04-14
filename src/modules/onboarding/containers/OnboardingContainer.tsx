import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { TranslationKey, type Language, type UseTranslationResult } from "@/lib/i18n";
import type { CatProfile, OnboardingStep } from "@/lib/onboarding";
import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories/catRepository";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories/onboardingRepository";
import {
  scheduleRepository as defaultScheduleRepository,
  type ScheduleRepository,
} from "@/lib/repositories/scheduleRepository";
import {
  usageRepository as defaultUsageRepository,
  type UsageRepository,
} from "@/lib/repositories/usageRepository";
import { OnboardingStepOneContainer } from "@/modules/onboarding/containers/OnboardingStepOneContainer";
import { OnboardingStepTwoContainer } from "@/modules/onboarding/containers/OnboardingStepTwoContainer";
import { useOnboardingStepper } from "@/modules/onboarding/hooks/useOnboardingStepper";
import { useOnboardingState } from "@/modules/onboarding/hooks/useOnboardingState";
import { OnboardingStepPlaceholderView } from "@/modules/onboarding/views/OnboardingStepPlaceholderView";
import { OnboardingView } from "@/modules/onboarding/views/OnboardingView";

type OnboardingContainerProps = {
  catRepository?: CatRepository;
  onboardingRepository?: OnboardingRepository;
  scheduleRepository?: ScheduleRepository;
  usageRepository?: UsageRepository;
  onCompleted?: () => Promise<void> | void;
  language: Language;
  setLanguage: UseTranslationResult["setLanguage"];
  getTranslation: UseTranslationResult["getTranslation"];
};

export function OnboardingContainer({
  catRepository = defaultCatRepository,
  onboardingRepository = defaultOnboardingRepository,
  scheduleRepository = defaultScheduleRepository,
  usageRepository = defaultUsageRepository,
  onCompleted,
  language,
  setLanguage,
  getTranslation,
}: OnboardingContainerProps) {
  const { isLoading, onboardingState, refresh } = useOnboardingState(onboardingRepository);
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);
  const [isCatProfileLoading, setIsCatProfileLoading] = useState(true);
  const [canContinueToStepThree, setCanContinueToStepThree] = useState(false);
  const [hasBlockingUnsavedChanges, setHasBlockingUnsavedChanges] = useState(false);
  const loadingStepItems = useMemo(
    () => [
      { key: "1" as const, label: getTranslation(TranslationKey.OnboardingStepOneLabel) },
      { key: "2" as const, label: getTranslation(TranslationKey.OnboardingStepTwoLabel) },
      { key: "3" as const, label: getTranslation(TranslationKey.OnboardingStepThreeLabel) },
    ],
    [getTranslation],
  );

  const loadCatProfile = useCallback(async () => {
    setIsCatProfileLoading(true);
    const storedProfile = await catRepository.getCatProfile();
    setCatProfile(storedProfile);
    setIsCatProfileLoading(false);
  }, [catRepository]);

  useEffect(() => {
    let isMounted = true;

    void catRepository.getCatProfile().then((storedProfile) => {
      if (!isMounted) {
        return;
      }

      setCatProfile(storedProfile);
      setIsCatProfileLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [catRepository]);

  async function refreshAfterStepOneSubmit() {
    await loadCatProfile();
    await refresh();
  }

  const handleMoveToStep = useCallback(async (step: OnboardingStep) => {
    await onboardingRepository.setActiveStep(step);
    await loadCatProfile();
    await refresh();
  }, [loadCatProfile, onboardingRepository, refresh]);

  const handleFinish = useCallback(async () => {
    await onboardingRepository.finishOnboarding();
    await refresh();

    if (onCompleted) {
      await onCompleted();
    }
  }, [onCompleted, onboardingRepository, refresh]);
  const currentStep = onboardingState?.step ?? 1;
  const actualStep = String(currentStep) as `${OnboardingStep}`;
  const {
    steps,
    goNext,
    goPrevious,
    isPreviousActionDisabled,
    isNextActionDisabled,
  } = useOnboardingStepper({
    currentStep,
    canContinueToStepThree,
    hasBlockingUnsavedChanges,
    getTranslation,
    onStepChange: handleMoveToStep,
    onFinish: handleFinish,
  });

  if (!onboardingState) {
    return (
      <OnboardingView
        getTranslation={getTranslation}
        steps={loadingStepItems}
        actualStep="1"
        isLoading
        language={language}
        onLanguageChange={setLanguage}
      >
        <div />
      </OnboardingView>
    );
  }

  const showLoading = isLoading || isCatProfileLoading;

  let stepContent: ReactNode;

  if (onboardingState.step === 1) {
    stepContent = (
      <OnboardingStepOneContainer
        catRepository={catRepository}
        onboardingRepository={onboardingRepository}
        initialValues={catProfile}
        onSubmitted={refreshAfterStepOneSubmit}
        getTranslation={getTranslation}
      />
    );
  } else if (onboardingState.step === 2) {
    stepContent = (
      <OnboardingStepTwoContainer
        scheduleRepository={scheduleRepository}
        usageRepository={usageRepository}
        getTranslation={getTranslation}
        isPreviousActionDisabled={isPreviousActionDisabled}
        isNextActionDisabled={isNextActionDisabled}
        onCanContinueToStepThreeChange={setCanContinueToStepThree}
        onHasBlockingUnsavedChangesChange={setHasBlockingUnsavedChanges}
        onPreviousAction={() => {
          void goPrevious();
        }}
        onNextAction={() => {
          void goNext();
        }}
      />
    );
  } else {
    stepContent = (
      <OnboardingStepPlaceholderView
        getTranslation={getTranslation}
        note=""
        onPreviousAction={() => {
          void goPrevious();
        }}
        onNextAction={() => {
          void goNext();
        }}
      />
    );
  }

  return (
    <OnboardingView
      getTranslation={getTranslation}
      steps={steps}
      actualStep={actualStep}
      isLoading={showLoading}
      language={language}
      onLanguageChange={setLanguage}
    >
      {stepContent}
    </OnboardingView>
  );
}
