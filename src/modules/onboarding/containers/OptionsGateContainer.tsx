import { useState } from "react";
import { Toaster } from "@/components/Toast";
import { useTranslation } from "@/lib/i18n";
import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories/catRepository";
import {
  scheduleRepository as defaultScheduleRepository,
  type ScheduleRepository,
} from "@/lib/repositories/scheduleRepository";
import {
  usageRepository as defaultUsageRepository,
  type UsageRepository,
} from "@/lib/repositories/usageRepository";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories/onboardingRepository";
import { isDevelopmentInstall as defaultIsDevelopmentInstall } from "@/lib/chrome/management";
import { OptionsDeveloperToolsContainer } from "@/modules/options-developer-tools/containers/OptionsDeveloperToolsContainer";
import { OnboardingFinishContainer } from "@/modules/onboarding/containers/OnboardingFinishContainer";
import { OnboardingContainer } from "@/modules/onboarding/containers/OnboardingContainer";
import { useOnboardingState } from "@/modules/onboarding/hooks/useOnboardingState";
import { OptionsDashboardContainer } from "@/modules/options-dashboard/containers/OptionsDashboardContainer";

type OptionsGateContainerProps = {
  catRepository?: CatRepository;
  onboardingRepository?: OnboardingRepository;
  scheduleRepository?: ScheduleRepository;
  usageRepository?: UsageRepository;
  isDevelopmentInstall?: () => Promise<boolean>;
};

export function OptionsGateContainer({
  catRepository = defaultCatRepository,
  onboardingRepository = defaultOnboardingRepository,
  scheduleRepository = defaultScheduleRepository,
  usageRepository = defaultUsageRepository,
  isDevelopmentInstall = defaultIsDevelopmentInstall,
}: OptionsGateContainerProps) {
  const { language, setLanguage, getTranslation } = useTranslation();
  const { isLoading, onboardingState, refresh } =
    useOnboardingState(onboardingRepository);
  const [showFinishScreen, setShowFinishScreen] = useState(false);
  const [surfaceVersion, setSurfaceVersion] = useState(0);

  async function handleDeveloperToolsMutation() {
    setShowFinishScreen(false);
    await refresh();
    setSurfaceVersion((currentVersion) => currentVersion + 1);
  }

  let content = (
    <OnboardingContainer
      catRepository={catRepository}
      onboardingRepository={onboardingRepository}
      scheduleRepository={scheduleRepository}
      usageRepository={usageRepository}
      onCompleted={async () => {
        setShowFinishScreen(true);
        await refresh();
      }}
      language={language}
      setLanguage={setLanguage}
      getTranslation={getTranslation}
    />
  );

  if (isLoading || !onboardingState) {
    return (
      <>
        <Toaster position="bottom-center" />
        <div key={surfaceVersion}>{content}</div>
        <OptionsDeveloperToolsContainer
          getTranslation={getTranslation}
          onboardingRepository={onboardingRepository}
          usageRepository={usageRepository}
          scheduleRepository={scheduleRepository}
          isDevelopmentInstall={isDevelopmentInstall}
          onMutation={handleDeveloperToolsMutation}
        />
      </>
    );
  }

  if (onboardingState.finished) {
    content = showFinishScreen ? (
      <OnboardingFinishContainer
        getTranslation={getTranslation}
        catRepository={catRepository}
        onPrimaryAction={() => {
          setShowFinishScreen(false);
          void refresh();
        }}
      />
    ) : (
      <OptionsDashboardContainer
        getTranslation={getTranslation}
        catRepository={catRepository}
        scheduleRepository={scheduleRepository}
        usageRepository={usageRepository}
      />
    );
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div key={surfaceVersion}>{content}</div>
      <OptionsDeveloperToolsContainer
        getTranslation={getTranslation}
        onboardingRepository={onboardingRepository}
        usageRepository={usageRepository}
        scheduleRepository={scheduleRepository}
        isDevelopmentInstall={isDevelopmentInstall}
        onMutation={handleDeveloperToolsMutation}
      />
    </>
  );
}
