import { test as base, expect } from "@playwright/test";

// The static-export build (NODE_ENV=production) loads a real Cloudflare
// Turnstile widget and would POST to Formspree if a test ever submitted the
// form. Block both hosts so E2E runs are deterministic, offline-capable, and
// never fire a real submission.
const BLOCKED_HOSTS = ["challenges.cloudflare.com", "formspree.io"];

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**/*", (route) => {
      const hostname = new URL(route.request().url()).hostname;
      if (BLOCKED_HOSTS.some((blocked) => hostname === blocked || hostname.endsWith(`.${blocked}`))) {
        return route.abort();
      }
      return route.continue();
    });
    await use(page);
  },
});

export { expect };

/**
 * Navigates home and waits for client-side hydration to finish. The static
 * export in particular paints markup before React attaches event handlers;
 * clicking too early silently no-ops instead of failing loudly (networkidle
 * isn't a reliable enough signal — a fully static page has no trailing
 * network activity to wait for), so every spec goes through this instead of
 * a bare `page.goto("/")`. Nav.tsx sets `document.documentElement.dataset
 * .hydrated` once it mounts, on every page.
 */
export async function gotoHome(page: import("@playwright/test").Page, hash = "") {
  await page.goto(`/${hash}`);
  await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");
}
