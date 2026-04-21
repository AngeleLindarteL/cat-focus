import { useEffect, useState } from "react";
import type { OnboardingState } from "@/lib/onboarding";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories";

type UseOnboardingStateResult = {
  isLoading: boolean;
  onboardingState: OnboardingState | null;
  refresh: () => Promise<void>;
};

export function useOnboardingState(
  onboardingRepository: OnboardingRepository = defaultOnboardingRepository,
): UseOnboardingStateResult {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingState, setOnboardingState] = useState<OnboardingState | null>(null);

  async function refresh() {
    setIsLoading(true);
    const state = await onboardingRepository.getOnboardingState();
    setOnboardingState(state);
    setIsLoading(false);
  }

  useEffect(() => {
    void onboardingRepository.getOnboardingState().then((state: OnboardingState) => {
      setOnboardingState(state);
      setIsLoading(false);
    });
  }, [onboardingRepository]);

  return { isLoading, onboardingState, refresh };
}
