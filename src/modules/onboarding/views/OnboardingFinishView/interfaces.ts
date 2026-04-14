import type { CatProfile } from "@/lib/onboarding";
import type { UseTranslationResult } from "@/lib/i18n";

export type OnboardingFinishViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  catProfile: CatProfile | null;
  isLoading?: boolean;
  onPrimaryAction: () => void;
};

