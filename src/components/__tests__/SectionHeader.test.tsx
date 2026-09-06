import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHeader from "@/components/SectionHeader";

describe("SectionHeader", () => {
  it("renders its children inside a level-2 heading", () => {
    render(<SectionHeader>Experience</SectionHeader>);

    const heading = screen.getByRole("heading", { level: 2, name: "Experience" });
    expect(heading).toBeInTheDocument();
  });
});
