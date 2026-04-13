import type { StepperProps } from "@/components/Stepper/interfaces";

export function Stepper({ steps, actualStep }: StepperProps) {
  const currentStep = Number(actualStep);

  return (
    <ol className="grid grid-cols-3 gap-3" aria-label="Onboarding progress">
      {steps.map((step) => {
        const stepNumber = Number(step.key);
        const isActive = stepNumber <= currentStep;

        return (
          <li
            key={step.key}
            className="relative flex flex-col items-center gap-2 text-center"
          >
            <div className="relative flex w-full items-center justify-center py-2">
              <span
                aria-hidden="true"
                data-testid={`stepper-connector-${step.key}`}
                className={[
                  "absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full",
                  isActive ? "bg-amber-400" : "bg-stone-200",
                ].join(" ")}
              />
              <div
                className={[
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition",
                  isActive
                    ? "border-amber-500 bg-amber-100 text-amber-800"
                    : "border-stone-200 bg-stone-100 text-stone-500",
                ].join(" ")}
              >
                {step.key}
              </div>
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
