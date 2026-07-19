/**
 * Test: LeadCaptureForm → Calendly widget wrapper
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LeadCaptureForm } from "./LeadCaptureForm";

vi.mock("@/components/calendly/CalendlyWidget", () => ({
  default: ({ url }: { url: string }) => (
    <div data-testid="calendly-widget" data-url={url} />
  ),
}));

vi.mock("@/components/calendly/CalendlyButton", () => ({
  default: ({ url, text }: { url: string; text: string }) => (
    <a href={url} data-testid="calendly-button">
      {text}
    </a>
  ),
}));

describe("LeadCaptureForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Calendly instead of a traditional form", () => {
    render(<LeadCaptureForm />);
    expect(screen.queryByRole("button", { name: /submit/i })).not.toBeInTheDocument();
    expect(screen.getByTestId("calendly-widget")).toBeInTheDocument();
    expect(screen.getByText(/schedule a consultation/i)).toBeInTheDocument();
  });

  it("maps property-search to showing Calendly URL", () => {
    render(<LeadCaptureForm formType="property-search" />);
    expect(screen.getByTestId("calendly-widget")).toHaveAttribute(
      "data-url",
      "https://calendly.com/drjanduffy/showing"
    );
    expect(screen.getByText(/book a property showing/i)).toBeInTheDocument();
  });

  it("maps home-valuation to appointment Calendly URL", () => {
    render(<LeadCaptureForm formType="home-valuation" />);
    expect(screen.getByTestId("calendly-widget")).toHaveAttribute(
      "data-url",
      "https://calendly.com/drjanduffy/appointment"
    );
  });

  it("maps newsletter to 15-minute Calendly URL", () => {
    render(<LeadCaptureForm formType="newsletter" />);
    expect(screen.getByTestId("calendly-widget")).toHaveAttribute(
      "data-url",
      "https://calendly.com/drjanduffy/15min"
    );
  });
});
