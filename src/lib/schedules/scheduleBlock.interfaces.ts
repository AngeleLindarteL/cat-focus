import type { BlockedSite } from "@/lib/blockedSites";

export type ScheduleDays = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export type ScheduleTimeRange = {
  from: string;
  to: string;
};

export type ScheduleBlock = {
  id: string;
  name: string;
  schedule: {
    days: ScheduleDays;
    time: ScheduleTimeRange;
  };
  sites: BlockedSite[];
};

export type ScheduleBlockDraft = Omit<ScheduleBlock, "id">;
