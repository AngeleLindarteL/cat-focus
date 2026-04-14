import { SurfaceCard } from "@/components/SurfaceCard";
import { TranslationKey } from "@/lib/i18n";
import type { HomeViewProps } from "@/modules/home/views/HomeView/interfaces";

export function HomeView({
  variant,
  getTranslation,
  onPrimaryAction,
}: HomeViewProps) {
  const surface = variant === "options-home" ? "options" : "popup";
  const layoutClassName =
    surface === "popup"
      ? "inline-grid max-w-full justify-center [grid-template-columns:minmax(300px,24rem)]"
      : "w-full max-w-5xl";
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
    <div className="[width:fit-content] flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_35%),linear-gradient(180deg,_#fef7ed_0%,_#fff7ed_45%,_#fafaf9_100%)] px-4 py-6 text-stone-900">
      <div className={layoutClassName}>
        <SurfaceCard
          eyebrow={getTranslation(copy.eyebrow)}
          title={getTranslation(copy.title)}
          description={getTranslation(copy.description)}
          footer={
            secondaryText ? (
              <p className="text-xs leading-5 text-stone-500">
                {secondaryText}
              </p>
            ) : undefined
          }
        >
          <div className="space-y-4">
            <p className="rounded-2xl bg-stone-100 px-4 py-3 text-sm leading-6 text-stone-700">
              {getTranslation(copy.body)}
            </p>
            {primaryActionLabel && onPrimaryAction ? (
              <button
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-700"
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
