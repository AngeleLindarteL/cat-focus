import { openExtensionOptions } from "@/lib/chrome/extension";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import { HomeView } from "@/modules/home/views/HomeView";

type PopupHomeContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
};

export function PopupHomeContainer({
  getTranslation,
}: PopupHomeContainerProps) {
  return (
    <HomeView
      surface="popup"
      eyebrow={getTranslation(TranslationKey.PopupEyebrow)}
      title={getTranslation(TranslationKey.HomePopupTitle)}
      description={getTranslation(TranslationKey.HomePopupDescription)}
      body={getTranslation(TranslationKey.HomePopupBody)}
      primaryActionLabel={getTranslation(TranslationKey.HomePopupAction)}
      onPrimaryAction={() => {
        void openExtensionOptions();
      }}
      secondaryText={getTranslation(TranslationKey.HomePopupFooter)}
    />
  );
}
