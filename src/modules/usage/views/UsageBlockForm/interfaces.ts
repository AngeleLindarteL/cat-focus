import type { BlockedSite, PopularSitePresetItem } from "@/lib/blockedSites";
import type { UseTranslationResult } from "@/lib/i18n";

export type UsageBlockFormProps = {
  mode: "create" | "edit";
  getTranslation: UseTranslationResult["getTranslation"];
  showUnsavedReminder?: boolean;
  nameValue: string;
  nameError?: string;
  onNameChange: (value: string) => void;
  limitTimeValue: string;
  limitTimeError?: string;
  onLimitTimeChange: (value: string) => void;
  popularSites: PopularSitePresetItem[];
  onPopularSiteSelect: (item: PopularSitePresetItem) => void;
  sitesValue: BlockedSite[];
  sitesListError?: string;
  onSitesChange: (nextValue: BlockedSite[]) => void;
  clearSitesListError: () => void;
  isSiteEditable?: (site: BlockedSite) => boolean;
  onSubmit: () => void;
  submitDisabled?: boolean;
  onDelete?: () => void;
  onClose?: () => void;
};
