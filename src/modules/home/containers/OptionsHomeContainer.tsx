import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import { HomeView } from "@/modules/home/views/HomeView";

type OptionsHomeContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
};

export function OptionsHomeContainer({
  getTranslation,
}: OptionsHomeContainerProps) {
  return (
    <HomeView
      eyebrow={getTranslation(TranslationKey.OptionsEyebrow)}
      title={getTranslation(TranslationKey.HomeOptionsTitle)}
      description={getTranslation(TranslationKey.HomeOptionsDescription)}
      body={getTranslation(TranslationKey.HomeOptionsBody)}
      secondaryText={getTranslation(TranslationKey.HomeOptionsFooter)}
    />
  );
}
