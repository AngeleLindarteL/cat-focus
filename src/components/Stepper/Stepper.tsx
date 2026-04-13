import {
  STEPPER_ACTIVE_CIRCLE_CLASS_NAME,
  STEPPER_ACTIVE_LABEL_CLASS_NAME,
  STEPPER_CLASS_NAME,
  STEPPER_INACTIVE_CIRCLE_CLASS_NAME,
  STEPPER_INACTIVE_LABEL_CLASS_NAME,
  STEPPER_ITEM_CLASS_NAME,
} from "@/components/Stepper/constants";
import type { StepperProps } from "@/components/Stepper/interfaces";

export function Stepper({ steps, actualStep }: StepperProps) {
  const currentStep = Number(actualStep);

  return (
    <ol className={STEPPER_CLASS_NAME} aria-label="Onboarding progress">
      {steps.map((step) => {
        const stepNumber = Number(step.key);
        const isActive = stepNumber <= currentStep;

        return (
          <li key={step.key} className={STEPPER_ITEM_CLASS_NAME}>
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition",
                isActive
                  ? STEPPER_ACTIVE_CIRCLE_CLASS_NAME
                  : STEPPER_INACTIVE_CIRCLE_CLASS_NAME,
              ].join(" ")}
            >
              {step.key}
            </div>
            <span
              className={[
                "text-xs font-medium leading-5",
                isActive
                  ? STEPPER_ACTIVE_LABEL_CLASS_NAME
                  : STEPPER_INACTIVE_LABEL_CLASS_NAME,
              ].join(" ")}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
