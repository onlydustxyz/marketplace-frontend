import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("metadata/p/deluge/opengraph-image");
  await expect(page).toHaveScreenshot();
});
