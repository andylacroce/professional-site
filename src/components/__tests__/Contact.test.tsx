import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/components/Contact";

type TurnstileOptions = {
  sitekey: string;
  appearance: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

type TurnstileGlobal = {
  render: (el: HTMLElement, opts: TurnstileOptions) => string;
  execute: (id: string) => void;
};

function setTurnstile(turnstile: TurnstileGlobal | undefined) {
  (window as unknown as { turnstile?: TurnstileGlobal }).turnstile = turnstile;
}

async function openEmailForm() {
  const user = userEvent.setup();
  render(<Contact />);
  await user.click(screen.getByRole("button", { name: /send an email/i }));
  return user;
}

async function fillContactForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Message"), "Let's talk.");
}

describe("Contact", () => {
  it("links out to LinkedIn", () => {
    render(<Contact />);

    const linkedIn = screen.getByRole("link", { name: "LinkedIn" });
    expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/andrew-lacroce/");
  });

  it("expands the email card to reveal the contact form on click", async () => {
    await openEmailForm();

    expect(screen.getByRole("button", { name: /send an email/i })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("expands the meeting card to reveal the booking link on click", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const toggle = screen.getByRole("button", { name: /schedule a meeting/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const bookingLink = screen.getByRole("link", { name: /book a 30-minute intro call/i });
    expect(bookingLink).toHaveAttribute("href", "https://cal.com/andrew-lacroce");
  });
});

describe("Contact form submission", () => {
  let renderedOptions: TurnstileOptions | undefined;

  beforeEach(() => {
    renderedOptions = undefined;
    setTurnstile({
      render: vi.fn((_el, opts) => {
        renderedOptions = opts;
        return "widget-1";
      }),
      execute: vi.fn(),
    });
  });

  afterEach(() => {
    setTurnstile(undefined);
  });

  it("tracks what the user types into each field", async () => {
    const user = await openEmailForm();
    await fillContactForm(user);

    expect(screen.getByLabelText("Name")).toHaveValue("Ada Lovelace");
    expect(screen.getByLabelText("Email")).toHaveValue("ada@example.com");
    expect(screen.getByLabelText("Message")).toHaveValue("Let's talk.");
  });

  it("blocks submission and surfaces the Turnstile widget until a token is issued", async () => {
    const user = await openEmailForm();
    await fillContactForm(user);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/complete the security check/i)).toBeInTheDocument();
    const turnstile = (window as unknown as { turnstile: TurnstileGlobal }).turnstile;
    expect(turnstile.execute).toHaveBeenCalledWith("widget-1");
  });

  it("submits successfully once Turnstile issues a token", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    const user = await openEmailForm();
    await fillContactForm(user);
    act(() => renderedOptions?.callback("token-abc"));

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
  });

  it("shows an error message when the submission response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const user = await openEmailForm();
    await fillContactForm(user);
    act(() => renderedOptions?.callback("token-abc"));

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows an error message when the submission request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const user = await openEmailForm();
    await fillContactForm(user);
    act(() => renderedOptions?.callback("token-abc"));

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("re-requires the challenge if it expires after being completed", async () => {
    const user = await openEmailForm();
    await fillContactForm(user);
    act(() => renderedOptions?.callback("token-abc"));
    act(() => renderedOptions?.["expired-callback"]());

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/complete the security check/i)).toBeInTheDocument();
  });

  it("re-requires the challenge if it errors out after being completed", async () => {
    const user = await openEmailForm();
    await fillContactForm(user);
    act(() => renderedOptions?.callback("token-abc"));
    act(() => renderedOptions?.["error-callback"]());

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/complete the security check/i)).toBeInTheDocument();
  });
});

describe("Contact deep-linking", () => {
  const originalHash = window.location.hash;

  afterEach(() => {
    window.location.hash = originalHash;
  });

  it("auto-opens the email card and scrolls to it when the URL targets #contact-form", () => {
    vi.useFakeTimers();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    window.location.hash = "#contact-form";

    render(<Contact />);

    expect(screen.getByRole("button", { name: /send an email/i })).toHaveAttribute("aria-expanded", "true");

    act(() => {
      vi.advanceTimersByTime(320);
    });
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    vi.useRealTimers();
  });

  it("opens the email card when the hash changes after mount", () => {
    window.location.hash = "";
    render(<Contact />);

    const toggle = screen.getByRole("button", { name: /send an email/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    act(() => {
      window.location.hash = "#contact-form";
      window.dispatchEvent(new Event("hashchange"));
    });

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
