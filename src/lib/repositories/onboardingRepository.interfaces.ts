import { ONBOARDING_STORAGE_KEYS } from "@/lib/onboarding";
import type { OnboardingState, OnboardingStep } from "@/lib/onboarding";

export type OnboardingStorageShape = {
  [ONBOARDING_STORAGE_KEYS.step]?: number | null;
  [ONBOARDING_STORAGE_KEYS.finished]?: boolean | null;
};

export interface OnboardingRepository {
  getOnboardingState(): Promise<OnboardingState>;
  setActiveStep(step: OnboardingStep): Promise<void>;
  finishOnboarding(): Promise<void>;
}
