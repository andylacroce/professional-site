import { test, expect, gotoHome } from "./fixtures";

test("the page never triggers horizontal scrolling at this viewport", async ({ page }) => {
  await gotoHome(page);

  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );

  expect(overflows).toBe(false);
});

test("the nav bar stays within the viewport and every section is reachable", async ({ page }) => {
  await gotoHome(page);
  const viewportWidth = page.viewportSize()?.width ?? 0;

  const nav = page.getByRole("navigation");
  await expect(nav).toBeVisible();

  const navBox = await nav.boundingBox();
  expect(navBox).not.toBeNull();
  expect(navBox!.width).toBeLessThanOrEqual(viewportWidth + 1);

  for (const id of ["home", "about", "experience", "skills", "projects", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});

test("nav links keep a touch-friendly tap target", async ({ page }) => {
  await gotoHome(page);
  const links = page.getByRole("navigation").getByRole("link");
  const count = await links.count();

  for (let i = 0; i < count; i += 1) {
    const box = await links.nth(i).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(20);
  }
});

test("the hero image and headline are visible without scrolling", async ({ page }) => {
  await gotoHome(page);

  await expect(page.getByRole("img", { name: "Andrew Lacroce" })).toBeInViewport();
  await expect(page.getByRole("heading", { level: 1, name: "Andrew Lacroce" })).toBeInViewport();
});
