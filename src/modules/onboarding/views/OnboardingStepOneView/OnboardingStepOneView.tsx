import bodyPrimaryIcon from "@/assets/icons/cat-body-primary.svg";
import eyeIcon from "@/assets/icons/cat-eyes.svg";
import furPatchIcon from "@/assets/icons/cat-fur-patch.svg";
import tailIcon from "@/assets/icons/cat-tail.svg";
import { CatColorSelector } from "@/components/CatColorSelector";
import { PixelCat } from "@/components/PixelCat";
import type { OnboardingStepOneViewProps } from "@/modules/onboarding/views/OnboardingStepOneView/interfaces";

export function OnboardingStepOneView({
  register,
  errors,
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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
      <div className="space-y-5">
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

        <div className="grid gap-4 md:grid-cols-2">
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

        <button
          type="submit"
          className="cursor-pointer rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          {submitLabel}
        </button>
      </div>

      <div className="rounded-[30px] border border-stone-200 bg-stone-50/80 p-5">
        <p className="text-sm font-medium text-stone-800">{previewLabel}</p>
        <div className="mt-4 flex min-h-[280px] items-center justify-center rounded-[28px] bg-white">
          <PixelCat
            furColorPrimary={furColorPrimary}
            furColorSecondary={furColorSecondary}
            eyeColor={eyeColor}
            tailColor={tailColor}
          />
        </div>
      </div>
    </div>
  );
}
