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
import { OnboardingStepOneContainer } from "@/modules/onboarding/containers/OnboardingStepOneContainer";
import { OnboardingStepTwoContainer } from "@/modules/onboarding/containers/OnboardingStepTwoContainer";
import { useOnboardingState } from "@/modules/onboarding/hooks/useOnboardingState";
import type { OnboardingStepItem } from "@/modules/onboarding/types/onboardingView";
import { OnboardingStepPlaceholderView } from "@/modules/onboarding/views/OnboardingStepPlaceholderView";
import { OnboardingView } from "@/modules/onboarding/views/OnboardingView";

type OnboardingContainerProps = {
  catRepository?: CatRepository;
  onboardingRepository?: OnboardingRepository;
  scheduleRepository?: ScheduleRepository;
  onCompleted?: () => Promise<void> | void;
  language: Language;
  setLanguage: UseTranslationResult["setLanguage"];
  getTranslation: UseTranslationResult["getTranslation"];
};

export function OnboardingContainer({
  catRepository = defaultCatRepository,
  onboardingRepository = defaultOnboardingRepository,
  scheduleRepository = defaultScheduleRepository,
  onCompleted,
  language,
  setLanguage,
  getTranslation,
}: OnboardingContainerProps) {
  const { isLoading, onboardingState, refresh } = useOnboardingState(onboardingRepository);
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);
  const [isCatProfileLoading, setIsCatProfileLoading] = useState(true);
  const stepItems = useMemo<OnboardingStepItem[]>(
    () => [
      { key: "1", label: getTranslation(TranslationKey.OnboardingStepOneLabel) },
      { key: "2", label: getTranslation(TranslationKey.OnboardingStepTwoLabel) },
      { key: "3", label: getTranslation(TranslationKey.OnboardingStepThreeLabel) },
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

  async function handleMoveToStep(step: OnboardingStep) {
    await onboardingRepository.setActiveStep(step);
    await loadCatProfile();
    await refresh();
  }

  async function handleFinish() {
    await onboardingRepository.finishOnboarding();
    await refresh();

    if (onCompleted) {
      await onCompleted();
    }
  }

  if (!onboardingState) {
    return (
      <OnboardingView
        getTranslation={getTranslation}
        steps={stepItems}
        actualStep="1"
        isLoading
        language={language}
        onLanguageChange={setLanguage}
      >
        <div />
      </OnboardingView>
    );
  }

  const actualStep = String(onboardingState.step) as `${OnboardingStep}`;
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
        onboardingRepository={onboardingRepository}
        scheduleRepository={scheduleRepository}
        getTranslation={getTranslation}
        onSubmitted={refresh}
      />
    );
  } else {
    stepContent = (
      <OnboardingStepPlaceholderView
        getTranslation={getTranslation}
        note=""
        onPreviousAction={() => {
          void handleMoveToStep(2);
        }}
        onNextAction={() => {
          void handleFinish();
        }}
      />
    );
  }

  return (
    <OnboardingView
      getTranslation={getTranslation}
      steps={stepItems}
      actualStep={actualStep}
      isLoading={showLoading}
      language={language}
      onLanguageChange={setLanguage}
    >
      {stepContent}
    </OnboardingView>
  );
}
