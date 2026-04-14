import type { ReactNode } from "react";
import type { Language, UseTranslationResult } from "@/lib/i18n";
import type { OnboardingStepItem } from "@/modules/onboarding/types/onboardingView";

export type OnboardingViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  steps: OnboardingStepItem[];
  actualStep: string;
  children: ReactNode;
  isLoading?: boolean;
  language: Language;
  onLanguageChange: UseTranslationResult["setLanguage"];
};
