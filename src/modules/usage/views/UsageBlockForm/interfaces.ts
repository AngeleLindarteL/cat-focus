import type { BlockedSite, PopularSitePresetItem } from "@/lib/blockedSites";
import type { UseTranslationResult } from "@/lib/i18n";

export type UsageBlockFormProps = {
  mode: "create" | "edit";
  getTranslation: UseTranslationResult["getTranslation"];
  showUnsavedReminder?: boolean;
  nameValue: string;
  nameError?: string;
  onNameChange: (value: string) => void;
  limitHoursValue: string;
  limitHoursError?: string;
  onLimitHoursChange: (value: string) => void;
  limitMinutesValue: string;
  limitMinutesError?: string;
  onLimitMinutesChange: (value: string) => void;
  popularSites: PopularSitePresetItem[];
  onPopularSiteSelect: (item: PopularSitePresetItem) => void;
  sitesValue: BlockedSite[];
  sitesListError?: string;
  onSitesChange: (nextValue: BlockedSite[]) => void;
  clearSitesListError: () => void;
  isSiteEditable?: (site: BlockedSite) => boolean;
  onSubmit: () => void;
  submitDisabled?: boolean;
  submitTooltip?: string;
  onDelete?: () => void;
  onClose?: () => void;
};
