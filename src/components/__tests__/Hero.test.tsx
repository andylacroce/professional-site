import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "@/components/Hero";

describe("Hero", () => {
  it("renders the name, role, and summary", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1, name: "Andrew Lacroce" })).toBeInTheDocument();
    expect(screen.getByText(/Technical Program Manager/)).toBeInTheDocument();
  });

  it("opens a lightbox dialog when the profile photo is clicked, focusing its close button", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Expand profile photo" }));

    const dialog = screen.getByRole("dialog", { name: "Andrew Lacroce" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes the lightbox and restores focus to the trigger when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);
    const trigger = screen.getByRole("button", { name: "Expand profile photo" });

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the lightbox when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    await user.click(screen.getByRole("button", { name: "Expand profile photo" }));
    await user.click(screen.getByRole("dialog"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the lightbox when the photo inside it is clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    await user.click(screen.getByRole("button", { name: "Expand profile photo" }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("img", { name: "Andrew Lacroce" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the lightbox when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    await user.click(screen.getByRole("button", { name: "Expand profile photo" }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
