import type { StepperItem } from "@/components/Stepper";
import type { LegacyCatProfile, OnboardingStep } from "@/lib/onboarding";

export type OnboardingStepItem = StepperItem & {
  key: `${OnboardingStep}`;
};

export type CatProfileFormValues = LegacyCatProfile;
