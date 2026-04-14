import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TranslationKey } from "@/lib/i18n";
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
    [TranslationKey.ScheduleSiteAdd]: "Create",
    [TranslationKey.ScheduleSave]: "Save",
    [TranslationKey.ScheduleUnsavedReminderTitle]: "You changed this schedule.",
    [TranslationKey.ScheduleUnsavedReminderDescription]:
      "Press Save schedule to keep your updates.",
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
    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        getTranslation={getTranslation}
        isNextActionDisabled
        onCanContinueToStepThreeChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    expect(
      await screen.findByRole("button", { name: "Next" }),
    ).toBeDisabled();
  });

  it("enables the step 2 next action after the first schedule block is created", async () => {
    const onCanContinueToStepThreeChange = vi.fn();
    const onNextAction = vi.fn();

    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        getTranslation={getTranslation}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={onCanContinueToStepThreeChange}
        onPreviousAction={vi.fn()}
        onNextAction={onNextAction}
      />,
    );

    expect(onCanContinueToStepThreeChange).toHaveBeenCalledWith(false);

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
      expect(onCanContinueToStepThreeChange).toHaveBeenLastCalledWith(true);
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(onNextAction).toHaveBeenCalled();
  });

  it("shows a reminder when an existing schedule changes", async () => {
    const scheduleRepository = createScheduleRepository();

    await scheduleRepository.insertOne({
      name: "Weekday focus",
      schedule: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        time: {
          from: "06:00",
          to: "18:00",
        },
      },
      sites: [{ name: "X", domain: "x.com" }],
    });

    render(
      <OnboardingStepTwoContainer
        scheduleRepository={scheduleRepository}
        getTranslation={getTranslation}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    expect(await screen.findByDisplayValue("Weekday focus")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Schedule name"), {
      target: { value: "Weekday focus updated" },
    });

    expect(screen.getByText("You changed this schedule.")).toBeInTheDocument();
    expect(
      screen.getByText("Press Save schedule to keep your updates."),
    ).toBeInTheDocument();

    const reminder = screen.getByText("You changed this schedule.");
    const highlightedCard = reminder.closest("[data-highlighted]");

    expect(highlightedCard?.className).toContain("border-dashed");
    expect(highlightedCard?.className).toContain("border-amber-400");
    expect(highlightedCard).toHaveAttribute("data-highlighted", "true");
  });

  it("accepts 3-character names and rejects 2-character names", async () => {
    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        getTranslation={getTranslation}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Create first schedule" }));
    fireEvent.change(screen.getByLabelText("Schedule name"), {
      target: { value: "AB" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site name"), {
      target: { value: "X" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site domain"), {
      target: { value: "x.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Name is too short")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Weekday focus"), {
      target: { value: "ABC" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(screen.queryByText("Name is too short")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    });
  });
});
