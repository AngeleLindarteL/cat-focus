import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories/catRepository";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories/onboardingRepository";
import { OptionsHomeContainer } from "@/modules/home/containers/OptionsHomeContainer";
import { OnboardingFinishContainer } from "@/modules/onboarding/containers/OnboardingFinishContainer";
import { OnboardingContainer } from "@/modules/onboarding/containers/OnboardingContainer";
import { useOnboardingState } from "@/modules/onboarding/hooks/useOnboardingState";

type OptionsGateContainerProps = {
  catRepository?: CatRepository;
  onboardingRepository?: OnboardingRepository;
};

export function OptionsGateContainer({
  catRepository = defaultCatRepository,
  onboardingRepository = defaultOnboardingRepository,
}: OptionsGateContainerProps) {
  const { language, setLanguage, getTranslation } = useTranslation();
  const { isLoading, onboardingState, refresh } = useOnboardingState(onboardingRepository);
  const [showFinishScreen, setShowFinishScreen] = useState(false);

  if (isLoading || !onboardingState) {
    return (
      <OnboardingContainer
        catRepository={catRepository}
        onboardingRepository={onboardingRepository}
        onCompleted={async () => {
          setShowFinishScreen(true);
          await refresh();
        }}
        language={language}
        setLanguage={setLanguage}
        getTranslation={getTranslation}
      />
    );
  }

  if (!onboardingState.finished) {
    return (
      <OnboardingContainer
        catRepository={catRepository}
        onboardingRepository={onboardingRepository}
        onCompleted={async () => {
          setShowFinishScreen(true);
          await refresh();
        }}
        language={language}
        setLanguage={setLanguage}
        getTranslation={getTranslation}
      />
    );
  }

  if (showFinishScreen) {
    return (
      <OnboardingFinishContainer
        getTranslation={getTranslation}
        catRepository={catRepository}
        onPrimaryAction={() => {
          setShowFinishScreen(false);
          void refresh();
        }}
      />
    );
  }

  return <OptionsHomeContainer getTranslation={getTranslation} />;
}
