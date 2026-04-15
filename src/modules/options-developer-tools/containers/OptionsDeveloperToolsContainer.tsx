import { useEffect, useState } from "react";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import { isDevelopmentInstall as defaultIsDevelopmentInstall } from "@/lib/chrome/management";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories/onboardingRepository";
import {
  scheduleRepository as defaultScheduleRepository,
  type ScheduleRepository,
} from "@/lib/repositories/scheduleRepository";
import {
  usageRepository as defaultUsageRepository,
  type UsageRepository,
} from "@/lib/repositories/usageRepository";
import {
  DEVELOPER_TOOLS_ACTIONS,
  OptionsDeveloperToolsView,
  type DeveloperToolsActionId,
} from "@/modules/options-developer-tools/views/OptionsDeveloperToolsView";

type OptionsDeveloperToolsContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  onboardingRepository?: OnboardingRepository;
  usageRepository?: UsageRepository;
  scheduleRepository?: ScheduleRepository;
  isDevelopmentInstall?: () => Promise<boolean>;
  onMutation?: () => Promise<void>;
};

export function OptionsDeveloperToolsContainer({
  getTranslation,
  onboardingRepository = defaultOnboardingRepository,
  usageRepository = defaultUsageRepository,
  scheduleRepository = defaultScheduleRepository,
  isDevelopmentInstall = defaultIsDevelopmentInstall,
  onMutation,
}: OptionsDeveloperToolsContainerProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [pendingActionId, setPendingActionId] = useState<DeveloperToolsActionId | null>(
    null,
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void isDevelopmentInstall().then((result) => {
      if (!isMounted) {
        return;
      }

      setShouldRender(result);
      setFeedbackMessage(
        result
          ? getTranslation(TranslationKey.DeveloperToolsStatusIdle)
          : "",
      );
    });

    return () => {
      isMounted = false;
    };
  }, [getTranslation, isDevelopmentInstall]);

  async function runAction(
    actionId: DeveloperToolsActionId,
    action: () => Promise<void>,
    successMessage: string,
  ) {
    setPendingActionId(actionId);
    setIsError(false);
    setFeedbackMessage(getTranslation(TranslationKey.DeveloperToolsStatusWorking));

    try {
      await action();
      await onMutation?.();
      setFeedbackMessage(successMessage);
    } catch {
      setIsError(true);
      setFeedbackMessage(getTranslation(TranslationKey.DeveloperToolsErrorAction));
    } finally {
      setPendingActionId(null);
    }
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <OptionsDeveloperToolsView
      getTranslation={getTranslation}
      pendingActionId={pendingActionId}
      feedbackMessage={feedbackMessage}
      isError={isError}
      onSkipOnboarding={() => {
        void runAction(
          DEVELOPER_TOOLS_ACTIONS.skipOnboarding,
          async () => {
            await onboardingRepository.finishOnboarding();
          },
          getTranslation(TranslationKey.DeveloperToolsSuccessSkipOnboarding),
        );
      }}
      onResetOnboarding={() => {
        void runAction(
          DEVELOPER_TOOLS_ACTIONS.resetOnboarding,
          async () => {
            await onboardingRepository.resetOnboarding();
          },
          getTranslation(TranslationKey.DeveloperToolsSuccessResetOnboarding),
        );
      }}
      onClearUsageBlocks={() => {
        void runAction(
          DEVELOPER_TOOLS_ACTIONS.clearUsageBlocks,
          async () => {
            await usageRepository.deleteAll();
          },
          getTranslation(TranslationKey.DeveloperToolsSuccessClearUsageBlocks),
        );
      }}
      onClearScheduleBlocks={() => {
        void runAction(
          DEVELOPER_TOOLS_ACTIONS.clearScheduleBlocks,
          async () => {
            await scheduleRepository.deleteAll();
          },
          getTranslation(TranslationKey.DeveloperToolsSuccessClearScheduleBlocks),
        );
      }}
    />
  );
}
