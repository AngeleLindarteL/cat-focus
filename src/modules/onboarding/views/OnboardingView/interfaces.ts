import type { ReactNode } from "react";
import type { OnboardingStepItem } from "@/modules/onboarding/types/onboardingView";

export type OnboardingViewProps = {
  eyebrow: string;
  title: string;
  description: string;
  loadingLabel: string;
  steps: OnboardingStepItem[];
  actualStep: string;
  children: ReactNode;
  isLoading?: boolean;
};
