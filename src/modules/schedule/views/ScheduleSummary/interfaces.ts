import type { UseTranslationResult } from "@/lib/i18n";
import type { ScheduleDays } from "@/lib/schedules";

export type ScheduleSummaryProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  name: string;
  days: ScheduleDays;
  from: string;
  to: string;
  sitesCount: number;
};
