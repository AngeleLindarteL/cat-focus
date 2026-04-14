import type { ChangeEvent } from "react";
import type { UsageLimitTimeInputProps } from "@/modules/usage/components/UsageLimitTimeInput/interfaces";

function sanitizeNumericInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 2);
}

function handleNumericChange(
  event: ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void,
) {
  onChange(sanitizeNumericInput(event.target.value));
}

export function UsageLimitTimeInput({
  label,
  hoursLabel,
  minutesLabel,
  hoursValue,
  minutesValue,
  hoursError,
  minutesError,
  onHoursChange,
  onMinutesChange,
}: UsageLimitTimeInputProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-stone-800">{label}</legend>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">{hoursLabel}</span>
          <input
            type="number"
            min={0}
            max={23}
            inputMode="numeric"
            value={hoursValue}
            onChange={(event) => {
              handleNumericChange(event, onHoursChange);
            }}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
          />
          {hoursError ? (
            <p className="text-sm text-red-700">{hoursError}</p>
          ) : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">{minutesLabel}</span>
          <input
            type="number"
            min={0}
            max={59}
            inputMode="numeric"
            value={minutesValue}
            onChange={(event) => {
              handleNumericChange(event, onMinutesChange);
            }}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
          />
          {minutesError ? (
            <p className="text-sm text-red-700">{minutesError}</p>
          ) : null}
        </label>
      </div>
    </fieldset>
  );
}
