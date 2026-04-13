import type { ScheduleDays } from "@/lib/schedules";

export type ScheduleSummaryProps = {
  name: string;
  days: ScheduleDays;
  from: string;
  to: string;
  sitesCount: number;
  sitesLabel: string;
};
