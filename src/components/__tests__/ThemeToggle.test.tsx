import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/components/ThemeToggle";

type MediaQueryListenerMap = Record<string, () => void>;

function mockMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;
  const listeners: MediaQueryListenerMap = {};

  const mql = {
    get matches() {
      return matches;
    },
    addEventListener: (_event: string, handler: () => void) => {
      listeners.change = handler;
    },
    removeEventListener: () => {},
  };

  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mql));

  return {
    setMatches(next: boolean) {
      matches = next;
      listeners.change?.();
    },
  };
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.querySelector('meta[name="theme-color"]')?.remove();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ThemeToggle", () => {
  it("defaults to the system theme and applies it to the document", async () => {
    mockMatchMedia(false); // system does not prefer light -> dark

    render(<ThemeToggle />);

    const button = await screen.findByRole("button", { name: "Switch to light mode" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("respects a previously stored preference over the system theme", async () => {
    mockMatchMedia(false);
    window.localStorage.setItem("theme", "light");

    render(<ThemeToggle />);

    expect(await screen.findByRole("button", { name: "Switch to dark mode" })).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("toggles the theme and persists the choice", async () => {
    const user = userEvent.setup();
    mockMatchMedia(true); // system prefers light

    render(<ThemeToggle />);
    const button = await screen.findByRole("button", { name: "Switch to dark mode" });

    await user.click(button);

    expect(screen.getByRole("button", { name: "Switch to light mode" })).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  it("sets the theme-color meta to match the applied theme", async () => {
    mockMatchMedia(true); // system prefers light

    render(<ThemeToggle />);
    await screen.findByRole("button", { name: "Switch to dark mode" });

    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    expect(meta).not.toBeNull();
    expect(meta?.content).toBe("#f6f3ee");
  });

  it("updates an existing theme-color meta when the theme changes", async () => {
    const user = userEvent.setup();
    mockMatchMedia(true); // system prefers light -> initial theme is light
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#0a1112";
    document.head.appendChild(meta);

    render(<ThemeToggle />);
    const button = await screen.findByRole("button", { name: "Switch to dark mode" });
    expect(meta.content).toBe("#f6f3ee");

    await user.click(button);

    expect(meta.content).toBe("#0a1112");
  });

  it("re-syncs from the system when it changes and no preference is stored", async () => {
    const media = mockMatchMedia(false);
    render(<ThemeToggle />);
    await screen.findByRole("button", { name: "Switch to light mode" });

    act(() => {
      media.setMatches(true);
    });

    expect(await screen.findByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
