import { useEffect, useState } from "react";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import { isDevelopmentInstall as defaultIsDevelopmentInstall } from "@/lib/chrome/management";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories";
import {
  scheduleRepository as defaultScheduleRepository,
  type ScheduleRepository,
} from "@/lib/repositories";
import {
  usageRepository as defaultUsageRepository,
  type UsageRepository,
} from "@/lib/repositories";
import {
  DEVELOPER_TOOLS_ACTIONS,
  DEVELOPER_TOOLS_VISIBILITY_CONTROLS,
  OptionsDeveloperToolsView,
  type DeveloperToolsActionId,
  type DeveloperToolsVisibilityControlId,
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
  const [isOpen, setIsOpen] = useState(false);
  const [pendingActionId, setPendingActionId] = useState<DeveloperToolsActionId | null>(
    null,
  );
  const [pendingVisibilityControlId, setPendingVisibilityControlId] =
    useState<DeveloperToolsVisibilityControlId | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void isDevelopmentInstall().then((result) => {
      if (!isMounted) {
        return;
      }

      setShouldRender(result);
      setIsOpen(false);
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

  function handleVisibilityChange(
    controlId: DeveloperToolsVisibilityControlId,
    nextIsOpen: boolean,
  ) {
    setPendingVisibilityControlId(controlId);
    setIsOpen(nextIsOpen);
    setPendingVisibilityControlId(null);
  }

  return (
    <OptionsDeveloperToolsView
      getTranslation={getTranslation}
      isOpen={isOpen}
      pendingActionId={pendingActionId}
      pendingVisibilityControlId={pendingVisibilityControlId}
      feedbackMessage={feedbackMessage}
      isError={isError}
      onOpen={() => {
        handleVisibilityChange(DEVELOPER_TOOLS_VISIBILITY_CONTROLS.show, true);
      }}
      onClose={() => {
        handleVisibilityChange(DEVELOPER_TOOLS_VISIBILITY_CONTROLS.hide, false);
      }}
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
