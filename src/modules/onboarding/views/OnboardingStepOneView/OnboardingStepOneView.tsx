import bodyPrimaryIcon from "@/assets/icons/cat-body-primary.svg";
import eyeIcon from "@/assets/icons/cat-eyes.svg";
import furPatchIcon from "@/assets/icons/cat-fur-patch.svg";
import tailIcon from "@/assets/icons/cat-tail.svg";
import { CatColorSelector } from "@/components/CatColorSelector";
import { PixelCat } from "@/components/PixelCat";
import { TranslationKey } from "@/lib/i18n";
import type { OnboardingStepOneViewProps } from "@/modules/onboarding/views/OnboardingStepOneView/interfaces";
import {
  ONBOARDING_STEP_ONE_CAT_NAME_CLASS_NAME,
  ONBOARDING_STEP_ONE_COLOR_GRID_CLASS_NAME,
  ONBOARDING_STEP_ONE_FORM_PANEL_CLASS_NAME,
  ONBOARDING_STEP_ONE_LAYOUT_CLASS_NAME,
  ONBOARDING_STEP_ONE_PREVIEW_PANEL_CLASS_NAME,
  ONBOARDING_STEP_ONE_PREVIEW_SHELL_CLASS_NAME,
  ONBOARDING_STEP_ONE_SUBMIT_CLASS_NAME,
} from "@/modules/onboarding/views/OnboardingStepOneView/constants";

export function OnboardingStepOneView({
  getTranslation,
  register,
  errors,
  catName,
  furColorPrimary,
  furColorSecondary,
  eyeColor,
  tailColor,
}: OnboardingStepOneViewProps) {
  return (
    <div className={ONBOARDING_STEP_ONE_LAYOUT_CLASS_NAME}>
      <div className={ONBOARDING_STEP_ONE_FORM_PANEL_CLASS_NAME}>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">
            {getTranslation(TranslationKey.CatSetupTitle)}
          </h2>
          <p className="text-sm leading-6 text-stone-600">
            {getTranslation(TranslationKey.CatSetupDescription)}
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-800">
            {getTranslation(TranslationKey.CatNameLabel)}
          </span>
          <input
            {...register("name")}
            type="text"
            placeholder={getTranslation(TranslationKey.CatNamePlaceholder)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
          />
          {errors.name ? (
            <p className="text-sm text-red-700">{errors.name.message}</p>
          ) : null}
        </label>

        <div className={ONBOARDING_STEP_ONE_COLOR_GRID_CLASS_NAME}>
          <CatColorSelector
            {...register("furColorPrimary")}
            label={getTranslation(TranslationKey.CatPrimaryColorLabel)}
            icon={<img src={bodyPrimaryIcon} alt="" className="h-5 w-5" />}
            error={errors.furColorPrimary?.message}
          />

          <CatColorSelector
            {...register("furColorSecondary")}
            label={getTranslation(TranslationKey.CatSecondaryColorLabel)}
            icon={<img src={furPatchIcon} alt="" className="h-5 w-5" />}
            error={errors.furColorSecondary?.message}
          />

          <CatColorSelector
            {...register("eyeColor")}
            label={getTranslation(TranslationKey.CatEyeColorLabel)}
            icon={<img src={eyeIcon} alt="" className="h-5 w-5" />}
            error={errors.eyeColor?.message}
          />

          <CatColorSelector
            {...register("tailColor")}
            label={getTranslation(TranslationKey.CatTailColorLabel)}
            icon={<img src={tailIcon} alt="" className="h-5 w-5" />}
            error={errors.tailColor?.message}
          />
        </div>

        <button type="submit" className={ONBOARDING_STEP_ONE_SUBMIT_CLASS_NAME}>
          {getTranslation(TranslationKey.CatStepSubmit)}
        </button>
      </div>

      <div className={ONBOARDING_STEP_ONE_PREVIEW_SHELL_CLASS_NAME}>
        <p className="text-sm font-medium text-stone-800">
          {getTranslation(TranslationKey.CatPreviewLabel)}
        </p>
        <div className={ONBOARDING_STEP_ONE_PREVIEW_PANEL_CLASS_NAME}>
          <div className="flex flex-col items-center gap-3">
            <p
              className={ONBOARDING_STEP_ONE_CAT_NAME_CLASS_NAME}
              style={{
                fontFamily:
                  '"Press Start 2P", ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
              }}
            >
              {catName}
            </p>
            <PixelCat
              furColorPrimary={furColorPrimary}
              furColorSecondary={furColorSecondary}
              eyeColor={eyeColor}
              tailColor={tailColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
