import { openExtensionOptions } from "@/lib/chrome/extension";
import type { UseTranslationResult } from "@/lib/i18n";
import { HomeView } from "@/modules/home/views/HomeView";

type PopupHomeContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
};

export function PopupHomeContainer({
  getTranslation,
}: PopupHomeContainerProps) {
  return (
    <HomeView
      variant="popup-home"
      getTranslation={getTranslation}
      onPrimaryAction={() => {
        void openExtensionOptions();
      }}
    />
  );
}
