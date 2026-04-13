import type { ReactNode } from "react";

export type ScheduleCardProps = {
  isExpanded: boolean;
  summary: ReactNode;
  expandedContent: ReactNode;
  onExpand: () => void;
};
