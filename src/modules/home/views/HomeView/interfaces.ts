import type { UseTranslationResult } from "@/lib/i18n";

export type HomeViewProps = {
  variant:
    | "options-home"
    | "popup-home"
    | "popup-redirect"
    | "popup-redirect-loading";
  getTranslation: UseTranslationResult["getTranslation"];
  onPrimaryAction?: () => void;
};
