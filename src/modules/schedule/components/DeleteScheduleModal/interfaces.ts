import type { UseTranslationResult } from "@/lib/i18n";

export type DeleteScheduleModalProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
