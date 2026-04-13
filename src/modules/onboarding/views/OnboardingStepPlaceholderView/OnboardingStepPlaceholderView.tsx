import {
  ONBOARDING_STEP_PLACEHOLDER_CLASS_NAME,
  ONBOARDING_STEP_PLACEHOLDER_NOTE_CLASS_NAME,
  ONBOARDING_STEP_PLACEHOLDER_PRIMARY_ACTION_CLASS_NAME,
  ONBOARDING_STEP_PLACEHOLDER_SECONDARY_ACTION_CLASS_NAME,
} from "@/modules/onboarding/views/OnboardingStepPlaceholderView/constants";
import type { OnboardingStepPlaceholderViewProps } from "@/modules/onboarding/views/OnboardingStepPlaceholderView/interfaces";

export function OnboardingStepPlaceholderView({
  title,
  description,
  note,
  previousActionLabel,
  nextActionLabel,
  onPreviousAction,
  onNextAction,
}: OnboardingStepPlaceholderViewProps) {
  return (
    <div className={ONBOARDING_STEP_PLACEHOLDER_CLASS_NAME}>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-stone-900">
          {title}
        </h2>
        <p className="text-sm leading-6 text-stone-600">{description}</p>
        <p className={ONBOARDING_STEP_PLACEHOLDER_NOTE_CLASS_NAME}>{note}</p>
      </div>
      <div className="flex gap-3">
        {previousActionLabel && onPreviousAction ? (
          <button
            type="button"
            className={ONBOARDING_STEP_PLACEHOLDER_SECONDARY_ACTION_CLASS_NAME}
            onClick={onPreviousAction}
          >
            {previousActionLabel}
          </button>
        ) : null}
        <button
          type="button"
          className={ONBOARDING_STEP_PLACEHOLDER_PRIMARY_ACTION_CLASS_NAME}
          onClick={onNextAction}
        >
          {nextActionLabel}
        </button>
      </div>
    </div>
  );
}
