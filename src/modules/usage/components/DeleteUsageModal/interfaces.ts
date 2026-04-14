import type { UseTranslationResult } from "@/lib/i18n";

export type DeleteUsageModalProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
