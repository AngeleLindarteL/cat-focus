import type { CatProfile, OnboardingStep } from "@/lib/onboarding";

export type OnboardingStepItem = {
  key: `${OnboardingStep}`;
  label: string;
};

export type CatProfileFormValues = CatProfile;
