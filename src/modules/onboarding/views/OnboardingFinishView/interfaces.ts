import type { LegacyCatProfile } from "@/lib/onboarding";
import type { UseTranslationResult } from "@/lib/i18n";

export type OnboardingFinishViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  catProfile: LegacyCatProfile | null;
  isLoading?: boolean;
  onPrimaryAction: () => void;
};
