import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories/catRepository";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories/onboardingRepository";
import { OptionsHomeContainer } from "@/modules/home/containers/OptionsHomeContainer";
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
  const { isLoading, onboardingState, refresh } = useOnboardingState(onboardingRepository);

  if (isLoading || !onboardingState) {
    return (
      <OnboardingContainer
        catRepository={catRepository}
        onboardingRepository={onboardingRepository}
        onCompleted={refresh}
      />
    );
  }

  if (!onboardingState.finished) {
    return (
      <OnboardingContainer
        catRepository={catRepository}
        onboardingRepository={onboardingRepository}
        onCompleted={refresh}
      />
    );
  }

  return <OptionsHomeContainer />;
}
