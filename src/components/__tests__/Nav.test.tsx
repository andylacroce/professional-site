import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "@/components/Nav";

const expectedLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

beforeEach(() => {
  window.scrollTo = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Nav", () => {
  it("renders every section link", () => {
    render(<Nav />);

    for (const link of expectedLinks) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  });

  it("lays out links to wrap on narrow viewports and go row-aligned from the sm breakpoint up", () => {
    render(<Nav />);

    const list = screen.getByRole("list");
    expect(list).toHaveClass("flex-wrap");
    expect(list.className).toMatch(/\bsm:flex-nowrap\b/);

    const bar = screen.getByRole("link", { name: "About" }).closest("nav")?.firstElementChild;
    expect(bar?.className).toMatch(/\bflex-col\b/);
    expect(bar?.className).toMatch(/\bsm:flex-row\b/);
  });

  it("marks a clicked section link as the active page and clears it when Home is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    const aboutLink = screen.getByRole("link", { name: "About" });
    await user.click(aboutLink);
    expect(aboutLink).toHaveAttribute("aria-current", "page");

    const homeLink = screen.getByRole("link", { name: "Andrew Lacroce" });
    await user.click(homeLink);
    expect(aboutLink).not.toHaveAttribute("aria-current");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("exposes the LinkedIn link with an accessible label", () => {
    render(<Nav />);

    const linkedIn = screen.getByRole("link", { name: "Andrew Lacroce on LinkedIn" });
    expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/andrew-lacroce/");
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn).toHaveAttribute("rel", "noopener noreferrer");
  });
});
