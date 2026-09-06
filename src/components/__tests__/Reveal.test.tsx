import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Reveal from "@/components/Reveal";

type ObserverCallback = (entries: Pick<IntersectionObserverEntry, "isIntersecting">[]) => void;

let observedCallback: ObserverCallback | null = null;
const disconnect = vi.fn();

class MockIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observedCallback = callback;
  }
  observe = vi.fn();
  disconnect = disconnect;
  unobserve = vi.fn();
}

beforeEach(() => {
  observedCallback = null;
  disconnect.mockClear();
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Reveal", () => {
  it("starts hidden and reveals once its content intersects the viewport", () => {
    render(
      <Reveal>
        <p>Revealed content</p>
      </Reveal>,
    );

    const wrapper = screen.getByText("Revealed content").parentElement;
    expect(wrapper).toHaveClass("reveal");
    expect(wrapper).not.toHaveClass("is-visible");

    act(() => {
      observedCallback?.([{ isIntersecting: true }]);
    });

    expect(wrapper).toHaveClass("is-visible");
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("stays hidden for intersection entries that are not yet intersecting", () => {
    render(
      <Reveal>
        <p>Not yet revealed</p>
      </Reveal>,
    );

    const wrapper = screen.getByText("Not yet revealed").parentElement;

    act(() => {
      observedCallback?.([{ isIntersecting: false }]);
    });

    expect(wrapper).not.toHaveClass("is-visible");
    expect(disconnect).not.toHaveBeenCalled();
  });

  it("applies the requested reveal delay as a transition delay", () => {
    render(
      <Reveal delay={250}>
        <p>Delayed content</p>
      </Reveal>,
    );

    const wrapper = screen.getByText("Delayed content").parentElement;
    expect(wrapper).toHaveStyle({ transitionDelay: "250ms" });
  });
});
