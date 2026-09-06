import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// jsdom does not implement IntersectionObserver. Reveal.tsx relies on it, and
// most sections wrap their content in <Reveal>, so a no-op stub keeps every
// other component's tests from crashing on mount.
class NoopIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver);

// jsdom does not implement matchMedia. ThemeToggle.tsx relies on it, and it
// mounts on every page via Nav.tsx, so a no-op stub (system theme always
// reports "not light", i.e. dark) keeps every other component's tests from
// crashing on mount.
vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })),
);
