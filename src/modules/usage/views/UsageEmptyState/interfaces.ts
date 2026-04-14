import type { UseTranslationResult } from "@/lib/i18n";

export type UsageEmptyStateProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  onAction: () => void;
};
