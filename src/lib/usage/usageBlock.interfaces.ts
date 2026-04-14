import type { BlockedSite } from "@/lib/blockedSites";

export type UsageBlockLimit = {
  time: string;
  resetsAt: string;
};

export type UsageBlock = {
  id: string;
  name: string;
  limit: UsageBlockLimit;
  sites: BlockedSite[];
};

export type UsageBlockDraft = Omit<UsageBlock, "id">;
