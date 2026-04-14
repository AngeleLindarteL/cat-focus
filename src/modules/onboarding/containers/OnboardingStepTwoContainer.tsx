import { useEffect, useMemo, useState } from "react";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import type { ScheduleBlock } from "@/lib/schedules";
import { scheduleRepository as defaultScheduleRepository } from "@/lib/repositories/scheduleRepository";
import { ScheduleBlockContainer } from "@/modules/schedule/containers/ScheduleBlockContainer";
import { OnboardingStepTwoView } from "@/modules/onboarding/views/OnboardingStepTwoView";

export type StepTwoBlockType = "scheduleBlock" | "usageTimeBlock";

type OnboardingStepTwoContainerProps = {
  scheduleRepository?: ScheduleRepository;
  getTranslation: UseTranslationResult["getTranslation"];
  isNextActionDisabled: boolean;
  onCanContinueToStepThreeChange: (canContinue: boolean) => void;
  onPreviousAction: () => void;
  onNextAction: () => void;
};

export function OnboardingStepTwoContainer({
  scheduleRepository = defaultScheduleRepository,
  getTranslation,
  isNextActionDisabled,
  onCanContinueToStepThreeChange,
  onPreviousAction,
  onNextAction,
}: OnboardingStepTwoContainerProps) {
  const [blockType, setBlockType] = useState<StepTwoBlockType>("scheduleBlock");
  const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlock[]>([]);
  const scheduleBlockValid = useMemo(
    () => scheduleBlocks.length > 0,
    [scheduleBlocks.length],
  );
  const usageBlockTimeValid = useMemo(() => true, []);
  const canContinueToStepThree = useMemo(
    () => scheduleBlockValid && usageBlockTimeValid,
    [scheduleBlockValid, usageBlockTimeValid],
  );

  useEffect(() => {
    onCanContinueToStepThreeChange(canContinueToStepThree);
  }, [canContinueToStepThree, onCanContinueToStepThreeChange]);

  return (
    <OnboardingStepTwoView
      getTranslation={getTranslation}
      value={blockType}
      options={[
        {
          value: "scheduleBlock",
          label: getTranslation(TranslationKey.StepTwoScheduleLabel),
          description: getTranslation(TranslationKey.StepTwoScheduleDescription),
        },
        {
          value: "usageTimeBlock",
          label: getTranslation(TranslationKey.StepTwoUsageLabel),
          description: getTranslation(TranslationKey.StepTwoUsageDescription),
        },
      ]}
      isNextActionDisabled={isNextActionDisabled}
      onValueChange={setBlockType}
      onPreviousAction={onPreviousAction}
      onNextAction={onNextAction}
    >
      {blockType === "scheduleBlock" ? (
        <ScheduleBlockContainer
          isOnboarding
          repository={scheduleRepository}
          getTranslation={getTranslation}
          onSchedulesChange={setScheduleBlocks}
        />
      ) : (
        <div className="rounded-[30px] border border-dashed border-stone-300 bg-stone-50/80 px-5 py-8 text-center text-sm font-medium text-stone-600">
          {getTranslation(TranslationKey.StepTwoUsageConstruction)}
        </div>
      )}
    </OnboardingStepTwoView>
  );
}
