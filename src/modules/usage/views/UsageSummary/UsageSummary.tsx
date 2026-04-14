import { TranslationKey } from "@/lib/i18n";
import type { UsageSummaryProps } from "@/modules/usage/views/UsageSummary/interfaces";

export function UsageSummary({
  getTranslation,
  name,
  limitTime,
  sitesCount,
}: UsageSummaryProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-base font-semibold text-stone-900">{name}</p>
        <p className="text-sm text-stone-500">
          {getTranslation(TranslationKey.UsageSummaryLimit)}: {limitTime}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-stone-600">
        <span>
          {sitesCount} {getTranslation(TranslationKey.UsageSummarySites)}
        </span>
      </div>
    </div>
  );
}
