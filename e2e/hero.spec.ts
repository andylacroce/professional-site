import { test, expect, gotoHome } from "./fixtures";

test.describe("profile photo lightbox", () => {
  test("expands in a lightbox instead of navigating away", async ({ page }) => {
    await gotoHome(page);
    const trigger = page.getByRole("button", { name: "Expand profile photo" });

    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Andrew Lacroce" });
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });

  test("closes on the close button, backdrop click, and Escape", async ({ page }) => {
    await gotoHome(page);
    const trigger = page.getByRole("button", { name: "Expand profile photo" });
    const dialog = page.getByRole("dialog", { name: "Andrew Lacroce" });

    await trigger.click();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(dialog).not.toBeVisible();

    await trigger.click();
    await dialog.click({ position: { x: 2, y: 2 } });
    await expect(dialog).not.toBeVisible();

    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });
});
