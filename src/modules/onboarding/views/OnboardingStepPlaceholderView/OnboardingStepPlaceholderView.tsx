import {
  ONBOARDING_STEP_PLACEHOLDER_CLASS_NAME,
  ONBOARDING_STEP_PLACEHOLDER_NOTE_CLASS_NAME,
  ONBOARDING_STEP_PLACEHOLDER_PRIMARY_ACTION_CLASS_NAME,
  ONBOARDING_STEP_PLACEHOLDER_SECONDARY_ACTION_CLASS_NAME,
} from "@/modules/onboarding/views/OnboardingStepPlaceholderView/constants";
import { TranslationKey } from "@/lib/i18n";
import type { OnboardingStepPlaceholderViewProps } from "@/modules/onboarding/views/OnboardingStepPlaceholderView/interfaces";

export function OnboardingStepPlaceholderView({
  getTranslation,
  note,
  onPreviousAction,
  onNextAction,
}: OnboardingStepPlaceholderViewProps) {
  return (
    <div className={ONBOARDING_STEP_PLACEHOLDER_CLASS_NAME}>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-stone-900">
          {getTranslation(TranslationKey.OnboardingStepThreeTitle)}
        </h2>
        <p className="text-sm leading-6 text-stone-600">
          {getTranslation(TranslationKey.OnboardingStepThreeDescription)}
        </p>
        <p className={ONBOARDING_STEP_PLACEHOLDER_NOTE_CLASS_NAME}>{note}</p>
      </div>
      <div className="flex gap-3">
        {onPreviousAction ? (
          <button
            type="button"
            className={ONBOARDING_STEP_PLACEHOLDER_SECONDARY_ACTION_CLASS_NAME}
            onClick={onPreviousAction}
          >
            {getTranslation(TranslationKey.OnboardingBackAction)}
          </button>
        ) : null}
        <button
          type="button"
          className={ONBOARDING_STEP_PLACEHOLDER_PRIMARY_ACTION_CLASS_NAME}
          onClick={onNextAction}
        >
          {getTranslation(TranslationKey.OnboardingFinishAction)}
        </button>
      </div>
    </div>
  );
}
