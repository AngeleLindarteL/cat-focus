import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TranslationKey } from "@/lib/i18n";
import type { OnboardingRepository } from "@/lib/repositories/onboardingRepository";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import { OnboardingStepTwoContainer } from "@/modules/onboarding/containers/OnboardingStepTwoContainer";

function createScheduleRepository(): ScheduleRepository {
  let schedules = [] as Awaited<ReturnType<ScheduleRepository["findAll"]>>;

  return {
    findAll: async () => schedules,
    insertOne: async (schedule) => {
      const createdSchedule = {
        ...schedule,
        id: crypto.randomUUID(),
      };

      schedules = [...schedules, createdSchedule];

      return createdSchedule;
    },
    updateOneById: async (id, schedule) => {
      let updatedSchedule = null;

      schedules = schedules.map((currentSchedule) => {
        if (currentSchedule.id !== id) {
          return currentSchedule;
        }

        updatedSchedule = { ...schedule, id };
        return updatedSchedule;
      });

      return updatedSchedule;
    },
    deleteOneById: async (id) => {
      schedules = schedules.filter((schedule) => schedule.id !== id);
    },
  };
}

function getTranslation(key: string): string {
  const messages: Record<string, string> = {
    [TranslationKey.StepTwoTitle]: "Choose how you want to block distractions",
    [TranslationKey.StepTwoDescription]: "Set up your first block",
    [TranslationKey.StepTwoScheduleLabel]: "Schedule block",
    [TranslationKey.StepTwoScheduleDescription]: "Block during set hours",
    [TranslationKey.StepTwoUsageLabel]: "Usage time block",
    [TranslationKey.StepTwoUsageDescription]: "Block after time limits",
    [TranslationKey.StepTwoUsageConstruction]: "Coming soon",
    [TranslationKey.OnboardingBackAction]: "Back",
    [TranslationKey.OnboardingNextAction]: "Next",
    [TranslationKey.ScheduleEmptyTitle]: "No schedules yet",
    [TranslationKey.ScheduleEmptyDescription]: "Create your first schedule",
    [TranslationKey.ScheduleCreateFirst]: "Create first schedule",
    [TranslationKey.ScheduleCreate]: "Create",
    [TranslationKey.ScheduleNameLabel]: "Schedule name",
    [TranslationKey.ScheduleNamePlaceholder]: "Weekday focus",
    [TranslationKey.ScheduleDaysLabel]: "Days",
    [TranslationKey.ScheduleFromLabel]: "From",
    [TranslationKey.ScheduleToLabel]: "To",
    [TranslationKey.ScheduleSitesLabel]: "Sites",
    [TranslationKey.SchedulePopularSitesTitle]: "Popular sites",
    [TranslationKey.ScheduleSiteNamePlaceholder]: "Site name",
    [TranslationKey.ScheduleSiteDomainPlaceholder]: "Site domain",
    [TranslationKey.ScheduleSave]: "Save",
    [TranslationKey.ScheduleEdit]: "Edit",
    [TranslationKey.ScheduleDelete]: "Delete",
    [TranslationKey.ScheduleClose]: "Close",
    [TranslationKey.ValidationScheduleNameRequired]: "Name is required",
    [TranslationKey.ValidationScheduleNameMinLength]: "Name is too short",
    [TranslationKey.ValidationScheduleNameMaxLength]: "Name is too long",
    [TranslationKey.ValidationTimeRequired]: "Time is required",
    [TranslationKey.ValidationTimeRange]: "End time must be later",
    [TranslationKey.ValidationSitesRequired]: "At least one site is required",
    [TranslationKey.ValidationSiteNameRequired]: "Site name is required",
    [TranslationKey.ValidationDomainInvalid]: "Domain is invalid",
    [TranslationKey.WeekdayMonday]: "Mon",
    [TranslationKey.WeekdayTuesday]: "Tue",
    [TranslationKey.WeekdayWednesday]: "Wed",
    [TranslationKey.WeekdayThursday]: "Thu",
    [TranslationKey.WeekdayFriday]: "Fri",
    [TranslationKey.WeekdaySaturday]: "Sat",
    [TranslationKey.WeekdaySunday]: "Sun",
  };

  return messages[key] ?? key;
}

describe("OnboardingStepTwoContainer", () => {
  it("disables the step 2 next action when no schedule exists", async () => {
    const onboardingRepository = {
      setActiveStep: vi.fn().mockResolvedValue(undefined),
      finishOnboarding: vi.fn().mockResolvedValue(undefined),
      getOnboardingState: vi.fn().mockResolvedValue({ step: 2, finished: false }),
    } as OnboardingRepository;

    render(
      <OnboardingStepTwoContainer
        onboardingRepository={onboardingRepository}
        scheduleRepository={createScheduleRepository()}
        getTranslation={getTranslation}
        onSubmitted={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    expect(
      await screen.findByRole("button", { name: "Next" }),
    ).toBeDisabled();
  });

  it("enables the step 2 next action after the first schedule block is created", async () => {
    const onboardingRepository = {
      setActiveStep: vi.fn().mockResolvedValue(undefined),
      finishOnboarding: vi.fn().mockResolvedValue(undefined),
      getOnboardingState: vi.fn().mockResolvedValue({ step: 2, finished: false }),
    } as OnboardingRepository;
    const onSubmitted = vi.fn().mockResolvedValue(undefined);

    render(
      <OnboardingStepTwoContainer
        onboardingRepository={onboardingRepository}
        scheduleRepository={createScheduleRepository()}
        getTranslation={getTranslation}
        onSubmitted={onSubmitted}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Create first schedule" }));
    fireEvent.change(screen.getByLabelText("Schedule name"), {
      target: { value: "Weekday focus" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site name"), {
      target: { value: "X" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site domain"), {
      target: { value: "https://www.x.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(onboardingRepository.setActiveStep).toHaveBeenCalledWith(3);
      expect(onSubmitted).toHaveBeenCalled();
    });
  });
});
