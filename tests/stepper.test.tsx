import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
});
