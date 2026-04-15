import type { ReactNode } from "react";
import type { UseTranslationResult } from "@/lib/i18n";
import type { OptionsDashboardSectionId } from "@/modules/options-dashboard/services/optionsDashboardNavigation";

export type OptionsDashboardViewSectionItem = {
  id: OptionsDashboardSectionId;
  label: string;
  description: string;
};

export type OptionsDashboardViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  sections: OptionsDashboardViewSectionItem[];
  activeSectionId: OptionsDashboardSectionId;
  activeSectionTitle: string;
  activeSectionDescription: string;
  activeSectionContent: ReactNode;
  onSectionSelect: (sectionId: OptionsDashboardSectionId) => void;
};
