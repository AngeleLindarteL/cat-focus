import bodyPrimaryIcon from "@/assets/icons/cat-body-primary.svg";
import eyeIcon from "@/assets/icons/cat-eyes.svg";
import furPatchIcon from "@/assets/icons/cat-fur-patch.svg";
import { CatPixiCanvas } from "@/components/CatPixiCanvas";
import { CatColorSelector } from "@/components/CatColorSelector";
import { OptionSelector } from "@/components/OptionSelector";
import type { CatFurType } from "@/lib/cat";
import { TranslationKey } from "@/lib/i18n";
import type {
  NewCatAutosaveStatus,
  NewCatDashboardViewProps,
} from "@/modules/new-cat/views/NewCatDashboardView/interfaces";

const AUTOSAVE_STATUS_CLASS_NAME: Record<NewCatAutosaveStatus, string> = {
  saving: "text-amber-700",
  saved: "text-emerald-700",
  error: "text-red-700",
};

const AUTOSAVE_STATUS_KEY: Record<NewCatAutosaveStatus, TranslationKey> = {
  saving: TranslationKey.NewCatAutosaveSaving,
  saved: TranslationKey.NewCatAutosaveSaved,
  error: TranslationKey.NewCatAutosaveError,
};

export function NewCatDashboardView({
  getTranslation,
  profile,
  autosaveStatus,
  isLoading,
  onBaseFurColorChange,
  onEyeColorChange,
  onFurTypeChange,
  onFurTypeColor1Change,
  onFurTypeColor2Change,
}: NewCatDashboardViewProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
        {getTranslation(TranslationKey.LoadingLabel)}
      </div>
    );
  }

  const furTypeOptions = [
    {
      value: "stripes" as CatFurType,
      label: getTranslation(TranslationKey.NewCatFurTypeStripesLabel),
    },
    {
      value: "spots" as CatFurType,
      label: getTranslation(TranslationKey.NewCatFurTypeSpotsLabel),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <p className="text-sm font-medium text-stone-800">
          {getTranslation(TranslationKey.CatPreviewLabel)}
        </p>
        <div className="mt-4 flex justify-center rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_35%),linear-gradient(180deg,_#fef7ed_0%,_#fff7ed_45%,_#fafaf9_100%)] p-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="absolute bottom-2 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-[rgba(0,0,0,0.16)] blur-[2px]" />
              <CatPixiCanvas
                profile={profile}
                animation="idle"
                className="relative z-10"
              />
            </div>
            <p
              className={[
                "text-xs font-semibold tracking-[0.18em]",
                AUTOSAVE_STATUS_CLASS_NAME[autosaveStatus],
              ].join(" ")}
            >
              {getTranslation(AUTOSAVE_STATUS_KEY[autosaveStatus])}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl bg-stone-100 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">
            {getTranslation(TranslationKey.NewCatTitle)}
          </h3>
          <p className="text-sm leading-6 text-stone-600">
            {getTranslation(TranslationKey.NewCatDescription)}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CatColorSelector
            value={profile.baseFurColor}
            onChange={(event) => {
              onBaseFurColorChange(event.target.value);
            }}
            label={getTranslation(TranslationKey.NewCatBaseFurColorLabel)}
            icon={<img src={bodyPrimaryIcon} alt="" className="h-5 w-5" />}
          />

          <CatColorSelector
            value={profile.eyeColor}
            onChange={(event) => {
              onEyeColorChange(event.target.value);
            }}
            label={getTranslation(TranslationKey.NewCatEyeColorLabel)}
            icon={<img src={eyeIcon} alt="" className="h-5 w-5" />}
          />

          <OptionSelector
            value={profile.furType}
            options={furTypeOptions}
            onChange={onFurTypeChange}
            label={getTranslation(TranslationKey.NewCatFurTypeLabel)}
          />

          <CatColorSelector
            value={profile.furTypeColor1}
            onChange={(event) => {
              onFurTypeColor1Change(event.target.value);
            }}
            label={getTranslation(TranslationKey.NewCatPatternColor1Label)}
            icon={<img src={furPatchIcon} alt="" className="h-5 w-5" />}
          />

          {profile.furType === "spots" ? (
            <CatColorSelector
              value={profile.furTypeColor2}
              onChange={(event) => {
                onFurTypeColor2Change(event.target.value);
              }}
              label={getTranslation(TranslationKey.NewCatPatternColor2Label)}
              icon={<img src={furPatchIcon} alt="" className="h-5 w-5" />}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
