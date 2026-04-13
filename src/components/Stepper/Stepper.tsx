import type { StepperProps } from "@/components/Stepper/interfaces";

export function Stepper({ steps, actualStep }: StepperProps) {
  const currentStep = Number(actualStep);

  return (
    <ol className="grid grid-cols-3 gap-3" aria-label="Onboarding progress">
      {steps.map((step, index) => {
        const stepNumber = Number(step.key);
        const isActive = stepNumber <= currentStep;
        const showConnector = index < steps.length - 1;

        return (
          <li key={step.key} className="flex flex-col items-center gap-2 text-center">
            <div className="flex w-full items-center justify-center">
              <div
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition",
                  isActive
                    ? "border-amber-500 bg-amber-100 text-amber-800"
                    : "border-stone-200 bg-stone-100 text-stone-500",
                ].join(" ")}
              >
                {step.key}
              </div>
              {showConnector ? (
                <span
                  className={[
                    "ml-3 h-[2px] flex-1 rounded-full",
                    stepNumber < currentStep ? "bg-amber-400" : "bg-stone-200",
                  ].join(" ")}
                />
              ) : null}
            </div>
            <span
              className={[
                "text-xs font-medium leading-5",
                isActive ? "text-amber-700" : "text-stone-500",
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
