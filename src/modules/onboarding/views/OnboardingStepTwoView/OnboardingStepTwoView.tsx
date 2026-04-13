import { BlockTypeSelector } from "@/components/BlockTypeSelector";
import type { OnboardingStepTwoViewProps } from "@/modules/onboarding/views/OnboardingStepTwoView/interfaces";

export function OnboardingStepTwoView({
  title,
  description,
  value,
  options,
  previousActionLabel,
  nextActionLabel,
  isNextActionDisabled,
  onValueChange,
  onPreviousAction,
  onNextAction,
  children,
}: OnboardingStepTwoViewProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-stone-900">
          {title}
        </h2>
        <p className="text-sm leading-6 text-stone-600">{description}</p>
      </div>

      <BlockTypeSelector value={value} options={options} onChange={onValueChange} />
      {children}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPreviousAction}
          className="cursor-pointer rounded-2xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-300"
        >
          {previousActionLabel}
        </button>
        <button
          type="button"
          onClick={onNextAction}
          disabled={isNextActionDisabled}
          className="cursor-pointer rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          {nextActionLabel}
        </button>
      </div>
    </div>
  );
}
