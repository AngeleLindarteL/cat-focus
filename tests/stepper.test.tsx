import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "@/components/Stepper";

describe("Stepper", () => {
  it("highlights current and previous steps", () => {
    render(
      <Stepper
        steps={[
          { key: "1", label: "One" },
          { key: "2", label: "Two" },
          { key: "3", label: "Three" },
        ]}
        actualStep="2"
      />,
    );

    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const three = screen.getByText("3");

    expect(one.className).toContain("bg-amber-100");
    expect(two.className).toContain("bg-amber-100");
    expect(three.className).toContain("bg-stone-100");
  });

  it("renders a connector for every step including the last one", () => {
    render(
      <Stepper
        steps={[
          { key: "1", label: "One" },
          { key: "2", label: "Two" },
          { key: "3", label: "Three" },
        ]}
        actualStep="2"
      />,
    );

    expect(screen.getByTestId("stepper-connector-1")).toBeInTheDocument();
    expect(screen.getByTestId("stepper-connector-2")).toBeInTheDocument();
    expect(screen.getByTestId("stepper-connector-3")).toBeInTheDocument();
  });

  it("renders clickable circles only for steps with onClick and runs the callback", () => {
    const handleStepClick = vi.fn();

    render(
      <Stepper
        steps={[
          { key: "1", label: "One", onClick: handleStepClick },
          { key: "2", label: "Two" },
          { key: "3", label: "Three" },
        ]}
        actualStep="2"
      />,
    );

    const clickableStep = screen.getByRole("button", { name: "One" });

    expect(clickableStep.className).toContain("cursor-pointer");
    expect(clickableStep.className).toContain("hover:-translate-y-1");
    expect(screen.queryByRole("button", { name: "Two" })).not.toBeInTheDocument();

    fireEvent.click(clickableStep);

    expect(handleStepClick).toHaveBeenCalledTimes(1);
  });
});
