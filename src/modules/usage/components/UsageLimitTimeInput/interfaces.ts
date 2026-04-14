export type UsageLimitTimeInputProps = {
  label: string;
  hoursLabel: string;
  minutesLabel: string;
  hoursValue: string;
  minutesValue: string;
  hoursError?: string;
  minutesError?: string;
  onHoursChange: (value: string) => void;
  onMinutesChange: (value: string) => void;
};
