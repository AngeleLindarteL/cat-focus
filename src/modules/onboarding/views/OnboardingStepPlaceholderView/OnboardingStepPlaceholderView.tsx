import { TranslationKey } from "@/lib/i18n";
import type { OnboardingStepPlaceholderViewProps } from "@/modules/onboarding/views/OnboardingStepPlaceholderView/interfaces";

export function OnboardingStepPlaceholderView({
  getTranslation,
  note,
  onPreviousAction,
  onNextAction,
}: OnboardingStepPlaceholderViewProps) {
  return (
    <div className="space-y-5 rounded-2xl bg-stone-100 p-5">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-stone-900">
          {getTranslation(TranslationKey.OnboardingStepThreeTitle)}
        </h2>
        <p className="text-sm leading-6 text-stone-600">
          {getTranslation(TranslationKey.OnboardingStepThreeDescription)}
        </p>
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-3 text-sm leading-6 text-stone-500">
          {note}
        </p>
      </div>
      <div className="flex gap-3">
        {onPreviousAction ? (
          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            onClick={onPreviousAction}
          >
            {getTranslation(TranslationKey.OnboardingBackAction)}
          </button>
        ) : null}
        <button
          type="button"
          className="inline-flex flex-1 items-center justify-center rounded-2xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-700"
          onClick={onNextAction}
        >
          {getTranslation(TranslationKey.OnboardingFinishAction)}
        </button>
      </div>
    </div>
  );
}
