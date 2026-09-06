import { test, expect, gotoHome } from "./fixtures";

test("home page matches its visual baseline", async ({ page }) => {
  await gotoHome(page);
  await expect(page).toHaveScreenshot("home.png", { fullPage: true });
});

test("the expanded contact form matches its visual baseline", async ({ page }) => {
  await gotoHome(page);
  await page.getByRole("navigation").getByRole("link", { name: "Contact", exact: true }).click();
  await page.getByRole("button", { name: /send an email/i }).click();

  await expect(page.locator("#contact")).toHaveScreenshot("contact-form-open.png");
});
