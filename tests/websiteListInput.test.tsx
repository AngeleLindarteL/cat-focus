import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WebsiteListInput } from "@/components/WebsiteListInput";

function createProps() {
  return {
    label: "Sites",
    value: [] as Array<{ name: string; domain: string }>,
    siteNameLabel: "Site name is required",
    siteNamePlaceholder: "Site name",
    siteDomainPlaceholder: "Site domain",
    addLabel: "Create",
    editLabel: "Edit",
    deleteLabel: "Delete",
    onChange: vi.fn(),
    onValidationError: vi.fn(),
    clearValidationError: vi.fn(),
  };
}

describe("WebsiteListInput", () => {
  it("prevents duplicate manual adds across normalized domains", () => {
    const props = createProps();

    render(
      <WebsiteListInput
        {...props}
        value={[{ name: "X", domain: "x.com" }]}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Site name"), {
      target: { value: "X again" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site domain"), {
      target: { value: "https://www.x.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(props.onChange).not.toHaveBeenCalled();
  });

  it("prevents duplicate manual edits across normalized domains", () => {
    const props = createProps();

    render(
      <WebsiteListInput
        {...props}
        value={[
          { name: "X", domain: "x.com" },
          { name: "YouTube", domain: "youtube.com" },
        ]}
      />,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[1]);
    fireEvent.change(screen.getByPlaceholderText("Site domain"), {
      target: { value: "https://www.x.com" },
    });
    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);

    expect(props.onChange).not.toHaveBeenCalled();
  });

  it("renders preset-backed items as non-editable while keeping removal available", () => {
    const props = createProps();

    render(
      <WebsiteListInput
        {...props}
        value={[{ name: "X", domain: "x.com" }]}
        isSiteEditable={() => false}
      />,
    );

    expect(screen.getByRole("button", { name: "Edit" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Delete" })).toBeEnabled();
  });
});
