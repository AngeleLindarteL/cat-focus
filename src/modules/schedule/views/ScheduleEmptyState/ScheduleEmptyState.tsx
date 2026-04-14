import { TranslationKey } from "@/lib/i18n";
import type { ScheduleEmptyStateProps } from "@/modules/schedule/views/ScheduleEmptyState/interfaces";

export function ScheduleEmptyState({
  getTranslation,
  onAction,
}: ScheduleEmptyStateProps) {
  return (
    <div className="rounded-[30px] border border-dashed border-stone-300 bg-stone-50/80 px-5 py-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-stone-900">
          {getTranslation(TranslationKey.ScheduleEmptyTitle)}
        </h3>
        <p className="text-sm leading-6 text-stone-600">
          {getTranslation(TranslationKey.ScheduleEmptyDescription)}
        </p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="mt-5 cursor-pointer rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
      >
        {getTranslation(TranslationKey.ScheduleCreateFirst)}
      </button>
    </div>
  );
}
