import type { ReactNode } from "react";

export type UsageCardProps = {
  isExpanded: boolean;
  summary: ReactNode;
  expandedContent: ReactNode;
  onExpand: () => void;
  isHighlighted?: boolean;
};
