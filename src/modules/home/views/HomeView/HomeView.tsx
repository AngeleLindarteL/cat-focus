import { SurfaceCard } from "@/components/SurfaceCard";
import { TranslationKey } from "@/lib/i18n";
import {
  HOME_VIEW_BODY_PANEL_CLASS_NAME,
  HOME_VIEW_OPTIONS_LAYOUT_CLASS_NAME,
  HOME_VIEW_POPUP_LAYOUT_CLASS_NAME,
  HOME_VIEW_PRIMARY_ACTION_CLASS_NAME,
  HOME_VIEW_SECONDARY_TEXT_CLASS_NAME,
  HOME_VIEW_SHELL_CLASS_NAME,
} from "@/modules/home/views/HomeView/constants";
import type { HomeViewProps } from "@/modules/home/views/HomeView/interfaces";

export function HomeView({
  variant,
  getTranslation,
  onPrimaryAction,
}: HomeViewProps) {
  const surface = variant === "options-home" ? "options" : "popup";
  const layoutClassName =
    surface === "popup"
      ? HOME_VIEW_POPUP_LAYOUT_CLASS_NAME
      : HOME_VIEW_OPTIONS_LAYOUT_CLASS_NAME;
  const copyByVariant = {
    "options-home": {
      eyebrow: TranslationKey.OptionsEyebrow,
      title: TranslationKey.HomeOptionsTitle,
      description: TranslationKey.HomeOptionsDescription,
      body: TranslationKey.HomeOptionsBody,
      primaryActionLabel: undefined,
      secondaryText: TranslationKey.HomeOptionsFooter,
    },
    "popup-home": {
      eyebrow: TranslationKey.PopupEyebrow,
      title: TranslationKey.HomePopupTitle,
      description: TranslationKey.HomePopupDescription,
      body: TranslationKey.HomePopupBody,
      primaryActionLabel: TranslationKey.HomePopupAction,
      secondaryText: TranslationKey.HomePopupFooter,
    },
    "popup-redirect": {
      eyebrow: TranslationKey.PopupEyebrow,
      title: TranslationKey.PopupRedirectTitle,
      description: TranslationKey.PopupRedirectDescription,
      body: TranslationKey.PopupRedirectBody,
      primaryActionLabel: TranslationKey.PopupRedirectAction,
      secondaryText: TranslationKey.PopupRedirectFooter,
    },
    "popup-redirect-loading": {
      eyebrow: TranslationKey.PopupEyebrow,
      title: TranslationKey.PopupRedirectTitle,
      description: TranslationKey.PopupRedirectDescription,
      body: TranslationKey.LoadingLabel,
      primaryActionLabel: TranslationKey.PopupRedirectAction,
      secondaryText: TranslationKey.PopupRedirectFooter,
    },
  } as const;
  const copy = copyByVariant[variant];
  const primaryActionLabel = copy.primaryActionLabel
    ? getTranslation(copy.primaryActionLabel)
    : undefined;
  const secondaryText = copy.secondaryText
    ? getTranslation(copy.secondaryText)
    : undefined;

  return (
    <div className={HOME_VIEW_SHELL_CLASS_NAME}>
      <div className={layoutClassName}>
        <SurfaceCard
          eyebrow={getTranslation(copy.eyebrow)}
          title={getTranslation(copy.title)}
          description={getTranslation(copy.description)}
          footer={
            secondaryText ? (
              <p className={HOME_VIEW_SECONDARY_TEXT_CLASS_NAME}>{secondaryText}</p>
            ) : undefined
          }
        >
          <div className="space-y-4">
            <p className={HOME_VIEW_BODY_PANEL_CLASS_NAME}>
              {getTranslation(copy.body)}
            </p>
            {primaryActionLabel && onPrimaryAction ? (
              <button
                className={HOME_VIEW_PRIMARY_ACTION_CLASS_NAME}
                type="button"
                onClick={onPrimaryAction}
              >
                {primaryActionLabel}
              </button>
            ) : null}
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
