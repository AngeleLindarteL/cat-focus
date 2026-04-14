import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WebsiteListInput } from "@/components/WebsiteListInput";

function createProps() {
  return {
    label: "Sites",
    value: [] as Array<{ name: string; domain: string }>,
    siteNameRequiredMessage: "Site name is required",
    domainInvalidMessage: "Enter a valid website domain.",
    siteNamePlaceholder: "Site Name (example: Instagram)",
    siteDomainPlaceholder: "The Site you want to block (example: instagram.com)",
    addLabel: "Block this site",
    editLabel: "Edit",
    cancelLabel: "Cancel",
    deleteAriaLabel: "Delete site",
    onChange: vi.fn(),
    clearListError: vi.fn(),
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

    fireEvent.change(screen.getByPlaceholderText("Site Name (example: Instagram)"), {
      target: { value: "X again" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(
        "The Site you want to block (example: instagram.com)",
      ),
      {
      target: { value: "https://www.x.com" },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: "Block this site" }));

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
    fireEvent.change(
      screen.getByPlaceholderText(
        "The Site you want to block (example: instagram.com)",
      ),
      {
        target: { value: "https://www.x.com" },
      },
    );
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
    expect(screen.getByRole("button", { name: "Delete site" })).toBeEnabled();
  });

  it("shows the name error under the name input and marks it invalid", () => {
    const props = createProps();

    render(<WebsiteListInput {...props} />);

    fireEvent.click(screen.getByRole("button", { name: "Block this site" }));

    expect(screen.getByText("Site name is required")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Site Name (example: Instagram)"),
    ).toHaveAttribute("aria-invalid", "true");
  });

  it("shows the translated domain error under the domain input and marks it invalid", () => {
    const props = createProps();

    render(<WebsiteListInput {...props} />);

    fireEvent.change(
      screen.getByPlaceholderText("Site Name (example: Instagram)"),
      {
        target: { value: "Instagram" },
      },
    );
    fireEvent.change(
      screen.getByPlaceholderText(
        "The Site you want to block (example: instagram.com)",
      ),
      {
        target: { value: "nota_domain" },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: "Block this site" }));

    expect(
      screen.getByText("Enter a valid website domain."),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        "The Site you want to block (example: instagram.com)",
      ),
    ).toHaveAttribute("aria-invalid", "true");
  });

  it("renders the translated cancel action while editing", () => {
    const props = createProps();

    render(
      <WebsiteListInput
        {...props}
        value={[{ name: "Instagram", domain: "instagram.com" }]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("renders blocked websites in a capped responsive grid and truncates content", () => {
    const props = createProps();

    render(
      <WebsiteListInput
        {...props}
        value={[
          {
            name: "A very long website name that should truncate before reaching the actions",
            domain:
              "an-extremely-long-domain-name-that-should-truncate-before-overlapping-actions.example.com",
          },
        ]}
      />,
    );

    const siteName = screen.getByText(
      "A very long website name that should truncate before reaching the actions",
    );
    const siteDomain = screen.getByText(
      "an-extremely-long-domain-name-that-should-truncate-before-overlapping-actions.example.com",
    );
    const grid = siteName.closest("div")?.parentElement?.parentElement as HTMLElement;

    expect(grid).toHaveStyle({
      gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
      maxWidth: "calc(4 * 250px + 3 * 0.75rem)",
    });
    expect(siteName.className).toContain("truncate");
    expect(siteDomain.className).toContain("truncate");
  });
});
