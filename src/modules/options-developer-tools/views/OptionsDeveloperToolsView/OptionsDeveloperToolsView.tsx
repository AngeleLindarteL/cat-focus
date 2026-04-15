import { TranslationKey } from "@/lib/i18n";
import {
  DEVELOPER_TOOLS_ACTIONS,
  type DeveloperToolsActionId,
} from "@/modules/options-developer-tools/views/OptionsDeveloperToolsView/constants";
import type { OptionsDeveloperToolsViewProps } from "@/modules/options-developer-tools/views/OptionsDeveloperToolsView/interfaces";

type ActionTone = "primary" | "secondary" | "danger";

type ActionItem = {
  id: DeveloperToolsActionId;
  label: string;
  tone: ActionTone;
  onClick: () => void;
};

function getActionClassName(tone: ActionTone): string {
  const sharedClassName =
    "inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

  if (tone === "primary") {
    return `${sharedClassName} border-stone-900 bg-stone-900 text-stone-50 hover:bg-stone-700`;
  }

  if (tone === "danger") {
    return `${sharedClassName} border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100`;
  }

  return `${sharedClassName} border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-amber-50`;
}

export function OptionsDeveloperToolsView({
  getTranslation,
  pendingActionId,
  feedbackMessage,
  isError,
  onSkipOnboarding,
  onResetOnboarding,
  onClearUsageBlocks,
  onClearScheduleBlocks,
}: OptionsDeveloperToolsViewProps) {
  const actions: ActionItem[] = [
    {
      id: DEVELOPER_TOOLS_ACTIONS.skipOnboarding,
      label: getTranslation(TranslationKey.DeveloperToolsSkipOnboarding),
      tone: "primary",
      onClick: onSkipOnboarding,
    },
    {
      id: DEVELOPER_TOOLS_ACTIONS.resetOnboarding,
      label: getTranslation(TranslationKey.DeveloperToolsResetOnboarding),
      tone: "secondary",
      onClick: onResetOnboarding,
    },
    {
      id: DEVELOPER_TOOLS_ACTIONS.clearUsageBlocks,
      label: getTranslation(TranslationKey.DeveloperToolsClearUsageBlocks),
      tone: "danger",
      onClick: onClearUsageBlocks,
    },
    {
      id: DEVELOPER_TOOLS_ACTIONS.clearScheduleBlocks,
      label: getTranslation(TranslationKey.DeveloperToolsClearScheduleBlocks),
      tone: "danger",
      onClick: onClearScheduleBlocks,
    },
  ];

  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 sm:left-auto sm:w-[22rem]">
      <div className="overflow-hidden rounded-[28px] border border-amber-200 bg-white/95 shadow-[0_24px_80px_rgba(120,113,108,0.22)] backdrop-blur">
        <div className="border-b border-amber-100 bg-[linear-gradient(180deg,rgba(254,243,199,0.9)_0%,rgba(255,251,235,0.8)_100%)] px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-700">
            {getTranslation(TranslationKey.DeveloperToolsTitle)}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-700">
            {getTranslation(TranslationKey.DeveloperToolsDescription)}
          </p>
        </div>

        <div className="space-y-3 px-4 py-4">
          <div className="grid gap-2">
            {actions.map((action) => {
              const isDisabled = pendingActionId !== null;

              return (
                <button
                  key={action.id}
                  type="button"
                  className={getActionClassName(action.tone)}
                  disabled={isDisabled}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className={[
              "rounded-2xl px-3 py-2 text-xs leading-5",
              isError
                ? "bg-red-50 text-red-700"
                : "bg-stone-100 text-stone-600",
            ].join(" ")}
          >
            {feedbackMessage}
          </p>
        </div>
      </div>
    </aside>
  );
}
