import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("composes the nav and every page section with distinct landmark ids", () => {
    render(<Home />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    const sectionIds = ["home", "about", "experience", "skills", "projects", "contact"];
    for (const id of sectionIds) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it("renders section headings in reading order", () => {
    render(<Home />);

    const headingNames = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);

    expect(headingNames).toEqual(["About", "Experience", "Skills", "Projects", "Contact"]);
  });
});
