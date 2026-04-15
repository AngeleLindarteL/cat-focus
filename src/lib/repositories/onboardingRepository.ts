import {
  getLocalStorageValues,
  setLocalStorageValues,
} from "@/lib/chrome/storage";
import {
  ONBOARDING_STORAGE_KEYS,
  type OnboardingState,
  type OnboardingStep,
} from "@/lib/onboarding";
import { ONBOARDING_REPOSITORY_STORAGE_KEYS } from "@/lib/repositories/onboardingRepository.constants";
import type {
  OnboardingRepository,
  OnboardingStorageShape,
} from "@/lib/repositories/onboardingRepository.interfaces";

function normalizeOnboardingStep(step: number | null | undefined): OnboardingStep {
  if (step === 2 || step === 3) {
    return step;
  }

  return 1;
}

export class ChromeStorageOnboardingRepository implements OnboardingRepository {
  async getOnboardingState(): Promise<OnboardingState> {
    const values = await getLocalStorageValues<OnboardingStorageShape>(
      ONBOARDING_REPOSITORY_STORAGE_KEYS,
    );
    const finished = values[ONBOARDING_STORAGE_KEYS.finished] ?? false;

    if (finished) {
      return { step: 3, finished: true };
    }

    const step = normalizeOnboardingStep(values[ONBOARDING_STORAGE_KEYS.step]);

    return { step, finished: false };
  }

  async setActiveStep(step: OnboardingStep): Promise<void> {
    await setLocalStorageValues({
      [ONBOARDING_STORAGE_KEYS.step]: step,
      [ONBOARDING_STORAGE_KEYS.finished]: false,
    });
  }

  async finishOnboarding(): Promise<void> {
    await setLocalStorageValues({
      [ONBOARDING_STORAGE_KEYS.step]: 3,
      [ONBOARDING_STORAGE_KEYS.finished]: true,
    });
  }

  async resetOnboarding(): Promise<void> {
    await setLocalStorageValues({
      [ONBOARDING_STORAGE_KEYS.step]: 1,
      [ONBOARDING_STORAGE_KEYS.finished]: false,
    });
  }
}

export const onboardingRepository: OnboardingRepository =
  new ChromeStorageOnboardingRepository();

export type {
  OnboardingRepository,
  OnboardingStorageShape,
} from "@/lib/repositories/onboardingRepository.interfaces";
