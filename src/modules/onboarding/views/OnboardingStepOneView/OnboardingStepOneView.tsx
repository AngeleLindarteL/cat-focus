import bodyPrimaryIcon from "@/assets/icons/cat-body-primary.svg";
import eyeIcon from "@/assets/icons/cat-eyes.svg";
import furPatchIcon from "@/assets/icons/cat-fur-patch.svg";
import tailIcon from "@/assets/icons/cat-tail.svg";
import { CatColorSelector } from "@/components/CatColorSelector";
import { PixelCat } from "@/components/PixelCat";
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
  register,
  errors,
  catName,
  furColorPrimary,
  furColorSecondary,
  eyeColor,
  tailColor,
  title,
  description,
  nameLabel,
  namePlaceholder,
  primaryColorLabel,
  secondaryColorLabel,
  eyeColorLabel,
  tailColorLabel,
  previewLabel,
  submitLabel,
}: OnboardingStepOneViewProps) {
  return (
    <div className={ONBOARDING_STEP_ONE_LAYOUT_CLASS_NAME}>
      <div className={ONBOARDING_STEP_ONE_FORM_PANEL_CLASS_NAME}>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">
            {title}
          </h2>
          <p className="text-sm leading-6 text-stone-600">{description}</p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-800">{nameLabel}</span>
          <input
            {...register("name")}
            type="text"
            placeholder={namePlaceholder}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
          />
          {errors.name ? (
            <p className="text-sm text-red-700">{errors.name.message}</p>
          ) : null}
        </label>

        <div className={ONBOARDING_STEP_ONE_COLOR_GRID_CLASS_NAME}>
          <CatColorSelector
            {...register("furColorPrimary")}
            label={primaryColorLabel}
            icon={<img src={bodyPrimaryIcon} alt="" className="h-5 w-5" />}
            error={errors.furColorPrimary?.message}
          />

          <CatColorSelector
            {...register("furColorSecondary")}
            label={secondaryColorLabel}
            icon={<img src={furPatchIcon} alt="" className="h-5 w-5" />}
            error={errors.furColorSecondary?.message}
          />

          <CatColorSelector
            {...register("eyeColor")}
            label={eyeColorLabel}
            icon={<img src={eyeIcon} alt="" className="h-5 w-5" />}
            error={errors.eyeColor?.message}
          />

          <CatColorSelector
            {...register("tailColor")}
            label={tailColorLabel}
            icon={<img src={tailIcon} alt="" className="h-5 w-5" />}
            error={errors.tailColor?.message}
          />
        </div>

        <button type="submit" className={ONBOARDING_STEP_ONE_SUBMIT_CLASS_NAME}>
          {submitLabel}
        </button>
      </div>

      <div className={ONBOARDING_STEP_ONE_PREVIEW_SHELL_CLASS_NAME}>
        <p className="text-sm font-medium text-stone-800">{previewLabel}</p>
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
