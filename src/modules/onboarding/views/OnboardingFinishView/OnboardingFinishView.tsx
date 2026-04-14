import { useEffect } from "react";
import { confetti } from "@tsparticles/confetti";
import { PixelCat } from "@/components/PixelCat";
import { SurfaceCard } from "@/components/SurfaceCard";
import { TranslationKey } from "@/lib/i18n";
import type { OnboardingFinishViewProps } from "@/modules/onboarding/views/OnboardingFinishView/interfaces";

export function OnboardingFinishView({
  getTranslation,
  catProfile,
  isLoading = false,
  onPrimaryAction,
}: OnboardingFinishViewProps) {
  useEffect(() => {
    let timeoutId: number | null = null;

    void confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 35,
      gravity: 1.05,
      origin: { y: 0.62 },
      colors: ["#f59e0b", "#fbbf24", "#d97706", "#44403c", "#78716c"],
      zIndex: 2000,
    });

    timeoutId = window.setTimeout(() => {
      void confetti({
        particleCount: 90,
        spread: 110,
        startVelocity: 30,
        gravity: 1.1,
        origin: { y: 0.65 },
        colors: ["#f59e0b", "#fbbf24", "#d97706", "#57534e"],
        zIndex: 2000,
      });
    }, 240);

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const renderCat = catProfile ? (
    <div className="mt-4 flex justify-center rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_35%),linear-gradient(180deg,_#fef7ed_0%,_#fff7ed_45%,_#fafaf9_100%)] p-4">
      <PixelCat
        furColorPrimary={catProfile.furColorPrimary}
        furColorSecondary={catProfile.furColorSecondary}
        eyeColor={catProfile.eyeColor}
        tailColor={catProfile.tailColor}
      />
    </div>
  ) : (
    <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center text-sm text-stone-500">
      {getTranslation(TranslationKey.LoadingLabel)}
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fef3c7,transparent_35%),linear-gradient(180deg,#f8fafc_0%,#f5f5f4_100%)] px-4 py-8 text-stone-900">
      <div className="mx-auto w-full max-w-5xl">
        <SurfaceCard
          eyebrow={getTranslation(TranslationKey.OnboardingEyebrow)}
          title={getTranslation(TranslationKey.OnboardingFinishTitle)}
          description={getTranslation(TranslationKey.OnboardingFinishDescription)}
        >
          <div className="space-y-4">
            {renderCat}
            <div className="rounded-2xl bg-stone-100 px-4 py-3 text-center text-sm leading-6 text-stone-700">
              <p className="italic">
                {`<<${getTranslation(TranslationKey.OnboardingFinishQuote)}>>`}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                {getTranslation(TranslationKey.OnboardingFinishQuoteAuthor)}
              </p>
            </div>
            <button
              type="button"
              onClick={onPrimaryAction}
              disabled={isLoading}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              {getTranslation(TranslationKey.OnboardingFinishActionLabel)}
            </button>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
