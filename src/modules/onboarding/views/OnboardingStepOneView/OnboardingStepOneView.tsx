import { PixelCat } from "@/components/PixelCat";
import {
  ONBOARDING_STEP_ONE_COLOR_GRID_CLASS_NAME,
  ONBOARDING_STEP_ONE_FORM_PANEL_CLASS_NAME,
  ONBOARDING_STEP_ONE_LAYOUT_CLASS_NAME,
  ONBOARDING_STEP_ONE_PREVIEW_PANEL_CLASS_NAME,
  ONBOARDING_STEP_ONE_PREVIEW_SHELL_CLASS_NAME,
  ONBOARDING_STEP_ONE_SUBMIT_CLASS_NAME,
} from "@/modules/onboarding/views/OnboardingStepOneView/constants";
import type { OnboardingStepOneViewProps } from "@/modules/onboarding/views/OnboardingStepOneView/interfaces";

export function OnboardingStepOneView({
  register,
  errors,
  furColorPrimary,
  furColorSecondary,
  title,
  description,
  nameLabel,
  namePlaceholder,
  primaryColorLabel,
  secondaryColorLabel,
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
          <label className="block space-y-2">
            <span className="text-sm font-medium text-stone-800">
              {primaryColorLabel}
            </span>
            <input
              {...register("furColorPrimary")}
              type="color"
              className="h-12 w-full rounded-2xl border border-stone-200 bg-white p-2"
            />
            {errors.furColorPrimary ? (
              <p className="text-sm text-red-700">
                {errors.furColorPrimary.message}
              </p>
            ) : null}
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-stone-800">
              {secondaryColorLabel}
            </span>
            <input
              {...register("furColorSecondary")}
              type="color"
              className="h-12 w-full rounded-2xl border border-stone-200 bg-white p-2"
            />
            {errors.furColorSecondary ? (
              <p className="text-sm text-red-700">
                {errors.furColorSecondary.message}
              </p>
            ) : null}
          </label>
        </div>

        <button type="submit" className={ONBOARDING_STEP_ONE_SUBMIT_CLASS_NAME}>
          {submitLabel}
        </button>
      </div>

      <div className={ONBOARDING_STEP_ONE_PREVIEW_SHELL_CLASS_NAME}>
        <p className="text-sm font-medium text-stone-800">{previewLabel}</p>
        <div className={ONBOARDING_STEP_ONE_PREVIEW_PANEL_CLASS_NAME}>
          <PixelCat
            furColorPrimary={furColorPrimary}
            furColorSecondary={furColorSecondary}
          />
        </div>
      </div>
    </div>
  );
}
