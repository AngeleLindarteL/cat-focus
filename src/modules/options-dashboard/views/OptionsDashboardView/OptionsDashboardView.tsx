import { SurfaceCard } from "@/components/SurfaceCard";
import { TranslationKey } from "@/lib/i18n";
import type { OptionsDashboardViewProps } from "@/modules/options-dashboard/views/OptionsDashboardView/interfaces";

export function OptionsDashboardView({
  getTranslation,
  sections,
  activeSectionId,
  activeSectionTitle,
  activeSectionDescription,
  activeSectionContent,
  onSectionSelect,
}: OptionsDashboardViewProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_35%),linear-gradient(180deg,_#fef7ed_0%,_#fff7ed_45%,_#fafaf9_100%)] px-4 py-6 text-stone-900">
      <div className="w-[min(90vw,1200px)]">
        <SurfaceCard
          eyebrow={getTranslation(TranslationKey.OptionsEyebrow)}
          title={getTranslation(TranslationKey.OptionsDashboardTitle)}
          description={getTranslation(TranslationKey.OptionsDashboardDescription)}
          footer={
            <p className="text-xs leading-5 text-stone-500">
              {getTranslation(TranslationKey.OptionsDashboardFooter)}
            </p>
          }
        >
          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="rounded-[28px] border border-stone-200 bg-stone-50/80 p-4">
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                {getTranslation(TranslationKey.OptionsNavigationLabel)}
              </p>
              <nav
                className="mt-4 space-y-2"
                aria-label={getTranslation(TranslationKey.OptionsNavigationLabel)}
              >
                {sections.map((section) => {
                  const isActive = section.id === activeSectionId;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => {
                        onSectionSelect(section.id);
                      }}
                      className={[
                        "flex w-full cursor-pointer flex-col items-start rounded-[24px] border px-4 py-3 text-left transition",
                        isActive
                          ? "border-amber-300 bg-amber-50 text-stone-900 shadow-[0_16px_40px_rgba(251,191,36,0.15)]"
                          : "border-transparent bg-white text-stone-700 hover:border-stone-200 hover:bg-stone-50",
                      ].join(" ")}
                    >
                      <span className="text-sm font-semibold">{section.label}</span>
                      <span className="mt-1 text-xs leading-5 text-stone-500">
                        {section.description}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <section className="rounded-[28px] border border-stone-200 bg-stone-100/85 p-5 sm:p-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
                  {activeSectionTitle}
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-stone-600">
                  {activeSectionDescription}
                </p>
              </div>

              <div className="mt-6">{activeSectionContent}</div>
            </section>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
