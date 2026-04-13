import type { BlockedSite } from "@/lib/schedules";

export type WebsiteListInputProps = {
  label: string;
  value: BlockedSite[];
  siteNameLabel: string;
  siteNamePlaceholder: string;
  siteDomainPlaceholder: string;
  addLabel: string;
  editLabel: string;
  deleteLabel: string;
  error?: string;
  onChange: (nextValue: BlockedSite[]) => void;
  onValidationError: (message: string) => void;
  clearValidationError: () => void;
  disabled?: boolean;
};
