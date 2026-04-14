import type { StepperItem } from "@/components/Stepper";
import type { CatProfile, OnboardingStep } from "@/lib/onboarding";

export type OnboardingStepItem = StepperItem & {
  key: `${OnboardingStep}`;
};

export type CatProfileFormValues = CatProfile;
