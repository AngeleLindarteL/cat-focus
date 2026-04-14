import type { UseTranslationResult } from "@/lib/i18n";

export type PopupOnboardingRedirectViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  isLoading?: boolean;
  onPrimaryAction: () => void;
};
