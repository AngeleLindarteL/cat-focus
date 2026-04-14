import type { RefObject } from "react";
import type { BlockedSite } from "@/lib/schedules";
import type {
  DayToggleOption,
  WeekdayToggleGroupRef,
} from "@/components/WeekdayToggleGroup";
import type { UseTranslationResult } from "@/lib/i18n";
import type { ScheduleSitePresetItem } from "@/modules/schedule/services/scheduleSitePresets";
import type { ScheduleBlockFormValues } from "@/modules/schedule/services/scheduleBlockForm";

export type ScheduleBlockFormProps = {
  mode: "create" | "edit";
  getTranslation: UseTranslationResult["getTranslation"];
  showUnsavedReminder?: boolean;
  nameValue: string;
  nameError?: string;
  onNameChange: (value: string) => void;
  weekdayOptions: DayToggleOption[];
  weekdayGroupKey: string;
  weekdayGroupRef: RefObject<WeekdayToggleGroupRef | null>;
  onWeekdayChange: (value: ScheduleBlockFormValues["days"]) => void;
  fromValue: string;
  fromError?: string;
  onFromChange: (value: string) => void;
  toValue: string;
  toError?: string;
  onToChange: (value: string) => void;
  popularSites: ScheduleSitePresetItem[];
  onPopularSiteSelect: (item: ScheduleSitePresetItem) => void;
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
