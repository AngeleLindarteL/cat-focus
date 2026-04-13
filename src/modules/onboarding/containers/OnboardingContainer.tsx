import { useEffect, useState, type ReactNode } from "react";
import { messages } from "@/lib/i18n/messages";
import type { CatProfile, OnboardingStep } from "@/lib/onboarding";
import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories/catRepository";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories/onboardingRepository";
import { OnboardingStepOneContainer } from "@/modules/onboarding/containers/OnboardingStepOneContainer";
import { useOnboardingState } from "@/modules/onboarding/hooks/useOnboardingState";
import type { OnboardingStepItem } from "@/modules/onboarding/types/onboardingView";
import { OnboardingStepPlaceholderView } from "@/modules/onboarding/views/OnboardingStepPlaceholderView";
import { OnboardingView } from "@/modules/onboarding/views/OnboardingView";

type OnboardingContainerProps = {
  catRepository?: CatRepository;
  onboardingRepository?: OnboardingRepository;
  onCompleted?: () => Promise<void> | void;
};

function getStepItems(): OnboardingStepItem[] {
  return [
    { key: "1", label: messages.onboardingStepOneLabel() },
    { key: "2", label: messages.onboardingStepTwoLabel() },
    { key: "3", label: messages.onboardingStepThreeLabel() },
  ];
}

export function OnboardingContainer({
  catRepository = defaultCatRepository,
  onboardingRepository = defaultOnboardingRepository,
  onCompleted,
}: OnboardingContainerProps) {
  const { isLoading, onboardingState, refresh } = useOnboardingState(onboardingRepository);
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);
  const [isCatProfileLoading, setIsCatProfileLoading] = useState(true);

  async function loadCatProfile() {
    setIsCatProfileLoading(true);
    const storedProfile = await catRepository.getCatProfile();
    setCatProfile(storedProfile);
    setIsCatProfileLoading(false);
  }

  useEffect(() => {
    void catRepository.getCatProfile().then((storedProfile) => {
      setCatProfile(storedProfile);
      setIsCatProfileLoading(false);
    });
  }, [catRepository]);

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
        eyebrow={messages.onboardingEyebrow()}
        title={messages.onboardingTitle()}
        description={messages.onboardingDescription()}
        loadingLabel={messages.loadingLabel()}
        steps={getStepItems()}
        actualStep="1"
        isLoading
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
        onSubmitted={refresh}
      />
    );
  } else if (onboardingState.step === 2) {
    stepContent = (
      <OnboardingStepPlaceholderView
        title={messages.onboardingStepTwoTitle()}
        description={messages.onboardingStepTwoDescription()}
        note={messages.onboardingStepPlaceholderNote()}
        previousActionLabel={messages.onboardingBackAction()}
        nextActionLabel={messages.onboardingNextAction()}
        onPreviousAction={() => {
          void handleMoveToStep(1);
        }}
        onNextAction={() => {
          void handleMoveToStep(3);
        }}
      />
    );
  } else {
    stepContent = (
      <OnboardingStepPlaceholderView
        title={messages.onboardingStepThreeTitle()}
        description={messages.onboardingStepThreeDescription()}
        note={messages.onboardingStepPlaceholderNote()}
        previousActionLabel={messages.onboardingBackAction()}
        nextActionLabel={messages.onboardingFinishAction()}
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
      eyebrow={messages.onboardingEyebrow()}
      title={messages.onboardingTitle()}
      description={messages.onboardingDescription()}
      loadingLabel={messages.loadingLabel()}
      steps={getStepItems()}
      actualStep={actualStep}
      isLoading={showLoading}
    >
      {stepContent}
    </OnboardingView>
  );
}
