import { useMemo, useState } from "react";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import type { OnboardingRepository } from "@/lib/repositories/onboardingRepository";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import type { ScheduleBlock } from "@/lib/schedules";
import { scheduleRepository as defaultScheduleRepository } from "@/lib/repositories/scheduleRepository";
import { ScheduleBlockContainer } from "@/modules/schedule/containers/ScheduleBlockContainer";
import { OnboardingStepTwoView } from "@/modules/onboarding/views/OnboardingStepTwoView";

export type StepTwoBlockType = "scheduleBlock" | "usageTimeBlock";

type OnboardingStepTwoContainerProps = {
  onboardingRepository: OnboardingRepository;
  scheduleRepository?: ScheduleRepository;
  getTranslation: UseTranslationResult["getTranslation"];
  onSubmitted: () => Promise<void>;
};

export function OnboardingStepTwoContainer({
  onboardingRepository,
  scheduleRepository = defaultScheduleRepository,
  getTranslation,
  onSubmitted,
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

  async function handlePreviousAction() {
    await onboardingRepository.setActiveStep(1);
    await onSubmitted();
  }

  async function handleNextAction() {
    if (!canContinueToStepThree) {
      return;
    }

    await onboardingRepository.setActiveStep(3);
    await onSubmitted();
  }

  return (
    <OnboardingStepTwoView
      title={getTranslation(TranslationKey.StepTwoTitle)}
      description={getTranslation(TranslationKey.StepTwoDescription)}
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
      previousActionLabel={getTranslation(TranslationKey.OnboardingBackAction)}
      nextActionLabel={getTranslation(TranslationKey.OnboardingNextAction)}
      isNextActionDisabled={!canContinueToStepThree}
      onValueChange={setBlockType}
      onPreviousAction={() => {
        void handlePreviousAction();
      }}
      onNextAction={() => {
        void handleNextAction();
      }}
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
