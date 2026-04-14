import type { BlockedSite } from "@/lib/blockedSites";

export type WebsiteListInputProps = {
  label: string;
  value: BlockedSite[];
  siteNameRequiredMessage: string;
  domainInvalidMessage: string;
  siteNamePlaceholder: string;
  siteDomainPlaceholder: string;
  addLabel: string;
  editLabel: string;
  cancelLabel: string;
  deleteAriaLabel: string;
  listError?: string;
  onChange: (nextValue: BlockedSite[]) => void;
  clearListError: () => void;
  isSiteEditable?: (site: BlockedSite) => boolean;
  disabled?: boolean;
};
