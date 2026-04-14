import { useEffect, useMemo, useState } from "react";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import type { UsageRepository } from "@/lib/repositories/usageRepository";
import type { ScheduleBlock } from "@/lib/schedules";
import { scheduleRepository as defaultScheduleRepository } from "@/lib/repositories/scheduleRepository";
import { usageRepository as defaultUsageRepository } from "@/lib/repositories/usageRepository";
import { ScheduleBlockContainer } from "@/modules/schedule/containers/ScheduleBlockContainer";
import { OnboardingStepTwoView } from "@/modules/onboarding/views/OnboardingStepTwoView";
import type { UsageBlock } from "@/lib/usage";
import { UsageBlockContainer } from "@/modules/usage/containers/UsageBlockContainer";

export type StepTwoBlockType = "scheduleBlock" | "usageTimeBlock";

type OnboardingStepTwoContainerProps = {
  scheduleRepository?: ScheduleRepository;
  usageRepository?: UsageRepository;
  getTranslation: UseTranslationResult["getTranslation"];
  isPreviousActionDisabled: boolean;
  isNextActionDisabled: boolean;
  onCanContinueToStepThreeChange: (canContinue: boolean) => void;
  onHasBlockingUnsavedChangesChange: (hasUnsavedChanges: boolean) => void;
  onPreviousAction: () => void;
  onNextAction: () => void;
};

export function OnboardingStepTwoContainer({
  scheduleRepository = defaultScheduleRepository,
  usageRepository = defaultUsageRepository,
  getTranslation,
  isPreviousActionDisabled,
  isNextActionDisabled,
  onCanContinueToStepThreeChange,
  onHasBlockingUnsavedChangesChange,
  onPreviousAction,
  onNextAction,
}: OnboardingStepTwoContainerProps) {
  const [blockType, setBlockType] = useState<StepTwoBlockType>("scheduleBlock");
  const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlock[]>([]);
  const [usageBlocks, setUsageBlocks] = useState<UsageBlock[]>([]);
  const [hasBlockingUnsavedChanges, setHasBlockingUnsavedChanges] = useState(false);
  const scheduleBlockValid = useMemo(
    () => scheduleBlocks.length > 0,
    [scheduleBlocks.length],
  );
  const usageBlockTimeValid = useMemo(
    () => usageBlocks.length > 0,
    [usageBlocks.length],
  );
  const canContinueToStepThree = useMemo(
    () => scheduleBlockValid || usageBlockTimeValid,
    [scheduleBlockValid, usageBlockTimeValid],
  );

  useEffect(() => {
    onCanContinueToStepThreeChange(canContinueToStepThree);
  }, [canContinueToStepThree, onCanContinueToStepThreeChange]);

  useEffect(() => {
    onHasBlockingUnsavedChangesChange(hasBlockingUnsavedChanges);
  }, [hasBlockingUnsavedChanges, onHasBlockingUnsavedChangesChange]);

  useEffect(() => {
    let isMounted = true;

    void Promise.all([
      scheduleRepository.findAll(),
      usageRepository.findAll(),
    ]).then(([storedSchedules, storedUsageBlocks]) => {
      if (!isMounted) {
        return;
      }

      setScheduleBlocks(storedSchedules);
      setUsageBlocks(storedUsageBlocks);
    });

    return () => {
      isMounted = false;
    };
  }, [scheduleRepository, usageRepository]);

  return (
    <OnboardingStepTwoView
      getTranslation={getTranslation}
      value={blockType}
      options={[
        {
          value: "scheduleBlock",
          label: getTranslation(TranslationKey.StepTwoScheduleLabel),
          description: getTranslation(
            TranslationKey.StepTwoScheduleDescription,
          ),
        },
        {
          value: "usageTimeBlock",
          label: getTranslation(TranslationKey.StepTwoUsageLabel),
          description: getTranslation(TranslationKey.StepTwoUsageDescription),
        },
      ]}
      isBlockTypeSelectorDisabled={hasBlockingUnsavedChanges}
      isPreviousActionDisabled={isPreviousActionDisabled}
      isNextActionDisabled={isNextActionDisabled}
      onValueChange={(nextValue) => {
        if (hasBlockingUnsavedChanges) {
          return;
        }

        setBlockType(nextValue);
      }}
      onPreviousAction={onPreviousAction}
      onNextAction={onNextAction}
    >
      {blockType === "scheduleBlock" ? (
        <ScheduleBlockContainer
          isOnboarding
          repository={scheduleRepository}
          getTranslation={getTranslation}
          onSchedulesChange={setScheduleBlocks}
          onHasBlockingUnsavedChangesChange={setHasBlockingUnsavedChanges}
        />
      ) : (
        <UsageBlockContainer
          isOnboarding
          repository={usageRepository}
          getTranslation={getTranslation}
          onUsageBlocksChange={setUsageBlocks}
          onHasBlockingUnsavedChangesChange={setHasBlockingUnsavedChanges}
        />
      )}
    </OnboardingStepTwoView>
  );
}
