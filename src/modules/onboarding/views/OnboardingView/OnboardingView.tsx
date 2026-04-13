import { SurfaceCard } from "@/components/SurfaceCard";
import { Stepper } from "@/components/Stepper";
import {
  ONBOARDING_VIEW_LOADING_CLASS_NAME,
  ONBOARDING_VIEW_SHELL_CLASS_NAME,
} from "@/modules/onboarding/views/OnboardingView/constants";
import type { OnboardingViewProps } from "@/modules/onboarding/views/OnboardingView/interfaces";

export function OnboardingView({
  eyebrow,
  title,
  description,
  loadingLabel,
  steps,
  actualStep,
  children,
  isLoading = false,
}: OnboardingViewProps) {
  return (
    <div className={ONBOARDING_VIEW_SHELL_CLASS_NAME}>
      <SurfaceCard eyebrow={eyebrow} title={title} description={description}>
        <div className="space-y-6">
          <Stepper steps={steps} actualStep={actualStep} />
          {isLoading ? (
            <div className={ONBOARDING_VIEW_LOADING_CLASS_NAME}>{loadingLabel}</div>
          ) : (
            children
          )}
        </div>
      </SurfaceCard>
    </div>
  );
}
