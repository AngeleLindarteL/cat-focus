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
    <div className="flex h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_35%),linear-gradient(180deg,_#fef7ed_0%,_#fff7ed_45%,_#fafaf9_100%)] px-4 py-6 text-stone-900">
      {/* Card shell — fixed 90 vh, full flex column */}
      <section className="flex h-[90vh] w-[70vw] flex-col overflow-hidden rounded-[32px] border border-stone-200/80 bg-white shadow-[0_24px_80px_rgba(120,113,108,0.12)]">
        {/* Header */}
        <div className="shrink-0 px-6 pt-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600">
                {getTranslation(TranslationKey.OptionsEyebrow)}
              </p>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
                  {getTranslation(TranslationKey.OptionsDashboardTitle)}
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-stone-600">
                  {getTranslation(TranslationKey.OptionsDashboardDescription)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard grid — grows to fill remaining height */}
        <div className="min-h-0 flex-1 px-6 py-6 sm:px-8">
          <div className="grid h-full min-h-0 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="overflow-y-auto rounded-[28px] border border-stone-200 bg-stone-50/80 p-4">
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                {getTranslation(TranslationKey.OptionsNavigationLabel)}
              </p>
              <nav
                className="mt-4 space-y-2"
                aria-label={getTranslation(
                  TranslationKey.OptionsNavigationLabel,
                )}
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
                      <span className="text-sm font-semibold">
                        {section.label}
                      </span>
                      <span className="mt-1 text-xs leading-5 text-stone-500">
                        {section.description}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <section className="flex min-h-0 flex-col overflow-hidden rounded-[28px] border border-stone-200 bg-stone-100/85 p-5 sm:p-6">
              <div className="shrink-0 space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
                  {activeSectionTitle}
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-stone-600">
                  {activeSectionDescription}
                </p>
              </div>

              <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1">
                {activeSectionContent}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 pb-6 sm:px-8">
          <p className="text-xs leading-5 text-stone-500">
            {getTranslation(TranslationKey.OptionsDashboardFooter)}
          </p>
        </div>
      </section>
    </div>
  );
}
