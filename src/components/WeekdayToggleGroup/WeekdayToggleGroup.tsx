import { forwardRef } from "react";
import { ToggleGroup } from "@/components/ToggleGroup";
import type {
  WeekdayToggleGroupProps,
  WeekdayToggleGroupRef,
} from "@/components/WeekdayToggleGroup/interfaces";

export const WeekdayToggleGroup = forwardRef<
  WeekdayToggleGroupRef,
  WeekdayToggleGroupProps
>(function WeekdayToggleGroup({ options, label, disabled = false }, ref) {
  return (
    <ToggleGroup
      ref={ref}
      label={label}
      disabled={disabled}
      options={options.map((option) => ({
        key: option.name,
        label: option.label,
        default: option.default,
      }))}
    />
  );
});
