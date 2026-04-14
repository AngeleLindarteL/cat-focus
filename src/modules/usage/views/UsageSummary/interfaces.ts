import type { UseTranslationResult } from "@/lib/i18n";

export type UsageSummaryProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  name: string;
  limitTime: string;
  sitesCount: number;
};
