import type { ScheduleDays } from "@/lib/schedules";

export type DayToggleOption = {
  name: keyof ScheduleDays;
  label: string;
  default: boolean;
};

export type WeekdayToggleGroupRef = {
  value: ScheduleDays;
};

export type WeekdayToggleGroupProps = {
  options: DayToggleOption[];
  label: string;
  disabled?: boolean;
  onChange?: (value: ScheduleDays) => void;
};
