import { test, expect, gotoHome } from "./fixtures";

const sectionLinks = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

test.describe("primary navigation", () => {
  test("clicking a link scrolls to its section and marks it active", async ({ page }) => {
    await gotoHome(page);
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();

    for (const { label, id } of sectionLinks) {
      const link = nav.getByRole("link", { name: label, exact: true });
      await link.click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
      await expect(link).toHaveAttribute("aria-current", "page");
    }
  });

  test("the Home link scrolls back to the top", async ({ page }) => {
    await gotoHome(page);
    const nav = page.getByRole("navigation");

    await nav.getByRole("link", { name: "Contact", exact: true }).click();
    await nav.getByRole("link", { name: "Andrew Lacroce", exact: true }).click();

    await expect(page.locator("#home")).toBeInViewport();
  });

  test("the LinkedIn link opens in a new tab", async ({ page }) => {
    await gotoHome(page);
    const linkedIn = page.getByRole("navigation").getByRole("link", { name: "Andrew Lacroce on LinkedIn" });

    await expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/andrew-lacroce/");
    await expect(linkedIn).toHaveAttribute("target", "_blank");
  });
});

test.describe("contact section", () => {
  test("the email and meeting cards expand independently", async ({ page }) => {
    await gotoHome(page);
    await page.getByRole("navigation").getByRole("link", { name: "Contact", exact: true }).click();

    const emailToggle = page.getByRole("button", { name: /send an email/i });
    const meetingToggle = page.getByRole("button", { name: /schedule a meeting/i });
    await expect(emailToggle).toHaveAttribute("aria-expanded", "false");
    await expect(meetingToggle).toHaveAttribute("aria-expanded", "false");

    await emailToggle.click();
    await expect(emailToggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(meetingToggle).toHaveAttribute("aria-expanded", "false");

    await meetingToggle.click();
    await expect(meetingToggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("link", { name: /book a 30-minute intro call/i })).toBeVisible();
  });
});
