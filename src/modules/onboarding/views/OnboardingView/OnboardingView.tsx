import { LanguageSelector } from "@/components/LanguageSelector";
import { SurfaceCard } from "@/components/SurfaceCard";
import { Stepper } from "@/components/Stepper";
import type { OnboardingViewProps } from "@/modules/onboarding/views/OnboardingView/interfaces";

export function OnboardingView({
  eyebrow,
  title,
  description,
  loadingLabel,
  steps,
  actualStep,
  children,
  isLoading = false,
  language,
  languageLabel,
  languageEnglishLabel,
  languageSpanishLabel,
  onLanguageChange,
}: OnboardingViewProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fef3c7,transparent_35%),linear-gradient(180deg,#f8fafc_0%,#f5f5f4_100%)] px-4 py-8">
      <SurfaceCard
        eyebrow={eyebrow}
        title={title}
        description={description}
        headerAccessory={
          <LanguageSelector
            value={language}
            label={languageLabel}
            englishLabel={languageEnglishLabel}
            spanishLabel={languageSpanishLabel}
            onChange={(value) => {
              void onLanguageChange(value);
            }}
          />
        }
      >
        <div className="space-y-6">
          <Stepper steps={steps} actualStep={actualStep} />
          {isLoading ? (
            <div className="rounded-[28px] border border-dashed border-stone-300 bg-stone-50/80 px-4 py-8 text-center text-sm font-medium text-stone-500">
              {loadingLabel}
            </div>
          ) : (
            children
          )}
        </div>
      </SurfaceCard>
    </div>
  );
}
