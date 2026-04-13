import type { ReactNode } from "react";
import type { Language, UseTranslationResult } from "@/lib/i18n";
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
  language: Language;
  languageLabel: string;
  languageEnglishLabel: string;
  languageSpanishLabel: string;
  onLanguageChange: UseTranslationResult["setLanguage"];
};
