import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "@/components/Nav";

const sectionIds = ["about", "experience", "skills", "projects", "contact"];

let rectTopsById: Record<string, number>;

function setLayout({ scrollY, innerHeight, scrollHeight }: { scrollY: number; innerHeight: number; scrollHeight: number }) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", { value: scrollHeight, configurable: true });
}

function dispatchScroll() {
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

function renderNavWithSections() {
  return render(
    <>
      <Nav />
      {sectionIds.map((id) => (
        <div key={id} id={id} />
      ))}
    </>,
  );
}

beforeEach(() => {
  rectTopsById = {};
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
    const top = rectTopsById[this.id] ?? 0;
    return { top, bottom: top, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} } as DOMRect;
  });
  // A tall page (scrollHeight far past the viewport) so the "scrolled to the
  // bottom" fast path doesn't shadow the section-highlighting logic below.
  setLayout({ scrollY: 300, innerHeight: 800, scrollHeight: 6000 });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Nav active-section highlighting while scrolling", () => {
  it("highlights the section whose top has crossed the viewport anchor", () => {
    rectTopsById = { about: -400, experience: 100, skills: 600, projects: 900, contact: 1200 };

    renderNavWithSections();
    dispatchScroll();

    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current");
  });

  it("falls back to the last section whose top has passed the anchor when none bracket it exactly", () => {
    // Every section's top is above the anchor (all already scrolled past),
    // so the loop's fallback branch should win: the last section wins.
    rectTopsById = { about: -900, experience: -700, skills: -500, projects: -300, contact: -100 };

    renderNavWithSections();
    dispatchScroll();

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("aria-current", "page");
  });

  it("snaps to the last link once the page is scrolled to the bottom", () => {
    rectTopsById = { about: -400, experience: 100, skills: 600, projects: 900, contact: 1200 };
    renderNavWithSections();
    dispatchScroll();
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("aria-current", "page");

    setLayout({ scrollY: 5300, innerHeight: 800, scrollHeight: 6000 });
    dispatchScroll();

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("aria-current", "page");
  });

  it("ignores scroll-driven updates for a moment after a manual link click", async () => {
    const user = userEvent.setup();
    rectTopsById = { about: -400, experience: 100, skills: 600, projects: 900, contact: 1200 };
    renderNavWithSections();

    await user.click(screen.getByRole("link", { name: "About" }));
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");

    // A scroll landing immediately after should be ignored while the manual
    // selection window is still open, even though it would otherwise
    // compute "Skills" as the active section.
    rectTopsById = { about: -900, experience: -700, skills: 100, projects: 900, contact: 1200 };
    dispatchScroll();

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
  });
});
