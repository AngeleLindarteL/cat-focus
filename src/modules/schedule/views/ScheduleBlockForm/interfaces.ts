import type { RefObject } from "react";
import type { BlockedSite } from "@/lib/schedules";
import type {
  DayToggleOption,
  WeekdayToggleGroupRef,
} from "@/components/WeekdayToggleGroup";
import type { ScheduleSitePresetItem } from "@/modules/schedule/services/scheduleSitePresets";

export type ScheduleBlockFormProps = {
  mode: "create" | "edit";
  reminderTitle?: string;
  reminderDescription?: string;
  showUnsavedReminder?: boolean;
  nameLabel: string;
  namePlaceholder: string;
  nameValue: string;
  nameError?: string;
  onNameChange: (value: string) => void;
  daysLabel: string;
  weekdayOptions: DayToggleOption[];
  weekdayGroupKey: string;
  weekdayGroupRef: RefObject<WeekdayToggleGroupRef | null>;
  fromLabel: string;
  fromValue: string;
  fromError?: string;
  onFromChange: (value: string) => void;
  toLabel: string;
  toValue: string;
  toError?: string;
  onToChange: (value: string) => void;
  sitesLabel: string;
  siteNameLabel: string;
  siteNamePlaceholder: string;
  siteDomainPlaceholder: string;
  popularSitesTitle: string;
  popularSites: ScheduleSitePresetItem[];
  onPopularSiteSelect: (item: ScheduleSitePresetItem) => void;
  addSiteLabel: string;
  editSiteLabel: string;
  deleteSiteLabel: string;
  sitesValue: BlockedSite[];
  sitesError?: string;
  onSitesChange: (nextValue: BlockedSite[]) => void;
  onSitesValidationError: (message: string) => void;
  clearSitesValidationError: () => void;
  isSiteEditable?: (site: BlockedSite) => boolean;
  submitLabel: string;
  onSubmit: () => void;
  submitDisabled?: boolean;
  onDelete?: () => void;
  deleteLabel?: string;
  onClose?: () => void;
  closeLabel?: string;
};
