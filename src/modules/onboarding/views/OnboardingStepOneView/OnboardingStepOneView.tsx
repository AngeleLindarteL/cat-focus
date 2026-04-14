import bodyPrimaryIcon from "@/assets/icons/cat-body-primary.svg";
import eyeIcon from "@/assets/icons/cat-eyes.svg";
import furPatchIcon from "@/assets/icons/cat-fur-patch.svg";
import tailIcon from "@/assets/icons/cat-tail.svg";
import { CatColorSelector } from "@/components/CatColorSelector";
import { PixelCat } from "@/components/PixelCat";
import { TranslationKey } from "@/lib/i18n";
import type { OnboardingStepOneViewProps } from "@/modules/onboarding/views/OnboardingStepOneView/interfaces";

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
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4 rounded-2xl bg-stone-100 p-5">
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

        <div className="grid gap-4 sm:grid-cols-2">
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

        <button
          type="submit"
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-700"
        >
          {getTranslation(TranslationKey.CatStepSubmit)}
        </button>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <p className="text-sm font-medium text-stone-800">
          {getTranslation(TranslationKey.CatPreviewLabel)}
        </p>
        <div className="mt-4 flex justify-center rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_35%),linear-gradient(180deg,_#fef7ed_0%,_#fff7ed_45%,_#fafaf9_100%)] p-4">
          <div className="flex flex-col items-center gap-3">
            <p
              className="min-h-5 text-center text-[11px] font-black uppercase tracking-[0.28em] text-black"
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
